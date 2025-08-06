from fastapi import APIRouter, HTTPException, Body, Request
from pydantic import BaseModel, EmailStr
from app.database.mongo import user_collection, password_reset_tokens_collection
import uuid
import bcrypt
import os
from datetime import datetime, timedelta
from app.services.email_service import email_service

router = APIRouter()

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, request_obj: Request):
    user = await user_collection.find_one({"email": request.email})
    if not user:
        # For security, always return a generic success message even if email not found
        return {"message": "If an account with that email exists, a password reset link has been sent."}

    reset_token = str(uuid.uuid4())
    expires_at = datetime.now() + timedelta(hours=1) # Token valid for 1 hour

    # Store token in MongoDB
    await password_reset_tokens_collection.insert_one({
        "token": reset_token,
        "user_id": user["user_id"],
        "email": request.email,
        "expires_at": expires_at
    })

    # Construct the full reset link
    # Use the FRONTEND_URL environment variable if available, otherwise construct a local dev URL
    frontend_url = os.getenv("FRONTEND_URL")
    if not frontend_url:
        # Fallback for local development
        host = request_obj.url.hostname
        port = request_obj.url.port
        if port and port != 80:
            frontend_url = f"http://{host}:{port}"
        else:
            frontend_url = f"http://{host}"
        # Assuming frontend is on port 8080 if not specified
        frontend_url = f"{frontend_url}:8080"
    
    reset_link = f"{frontend_url}/reset-password?token={reset_token}"

    try:
        await email_service.send_password_reset_email(request.email, reset_link)
    except Exception as e:
        # Log the error but don't reveal it to the user for security
        print(f"Failed to send email: {e}")
        # You might want to have a fallback or retry mechanism here

    return {"message": "If an account with that email exists, a password reset link has been sent."}

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    # Find the token in MongoDB
    token_doc = await password_reset_tokens_collection.find_one({"token": request.token})

    if not token_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    if datetime.now() > token_doc["expires_at"]:
        # Clean up expired token
        await password_reset_tokens_collection.delete_one({"token": request.token})
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user_id = token_doc["user_id"]
    new_hashed_password = bcrypt.hashpw(request.new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    await user_collection.update_one(
        {"user_id": user_id},
        {"$set": {"hashed_password": new_hashed_password}}
    )

    # Invalidate token after use
    await password_reset_tokens_collection.delete_one({"token": request.token})

    return {"message": "Password has been reset successfully."}
