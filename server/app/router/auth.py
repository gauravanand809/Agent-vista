from fastapi import APIRouter, Body, HTTPException, Response
from app.core.token import create_access_token, create_refresh_token, verify_token
from app.models.auth_request import SignUp, Login
from app.models.auth_response import UserResponseWithToken, TokenResponse
from ..database.mongo import user_collection
import uuid
import bcrypt
from datetime import datetime
from fastapi import APIRouter, Request, Response, HTTPException

router = APIRouter()

COOKIE_EXPIRE_DAYS = 7
COOKIE_MAX_AGE = COOKIE_EXPIRE_DAYS * 24 * 60 * 60 


@router.post("/signup", response_model=UserResponseWithToken)
async def signup(request: SignUp, response: Response):
    name = request.name
    email = request.email
    password = request.password.get_secret_value()
    unique_id = str(uuid.uuid4())
    candidate_id = str(uuid.uuid4())

    existing_user = await user_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    access_token = create_access_token({"sub": unique_id, "email": email, "candidate_id": candidate_id})
    refresh_token = create_refresh_token({"sub": unique_id})

    created_at = datetime.now()

    user_doc = {
        "user_id": unique_id,
        "candidate_id": candidate_id,
        "name": name,
        "email": email,
        "hashed_password": hashed_password,
        "is_verified": False,
        "created_at": created_at
    }

    await user_collection.insert_one(user_doc)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,          # set to True in production with HTTPS
        samesite="lax",       # adjust as needed: 'lax', 'strict', or 'none'
        max_age=COOKIE_MAX_AGE,
        path="/auth/refresh"  # cookie only sent on refresh endpoint
    )

    return UserResponseWithToken(
        id=unique_id,
        candidate_id=candidate_id,
        name=name,
        email=email,
        created_at=created_at,
        tokens=TokenResponse(
            access_token=access_token,
            refresh_token=""  
        )
    )


@router.post("/login", response_model=UserResponseWithToken)
async def login(request: Login, response: Response):
    email = request.email
    password = request.password.get_secret_value()

    user = await user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not bcrypt.checkpw(password.encode('utf-8'), user["hashed_password"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token({"sub": user["user_id"], "email": user["email"], "candidate_id": user["candidate_id"]})
    refresh_token = create_refresh_token({"sub": user["user_id"]})

    # Set refresh token in HttpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,  # make sure HTTPS is enabled in production
        samesite="lax",
        max_age=COOKIE_MAX_AGE,
        path="/auth/refresh"
    )

    return UserResponseWithToken(
        id=user["user_id"],
        candidate_id=user["candidate_id"],
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"],
        tokens=TokenResponse(
            access_token=access_token,
            refresh_token=""
        )
    )

@router.get("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    # Read refresh token from HttpOnly cookie
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    payload = verify_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid refresh token payload")

    new_access_token = create_access_token({"sub": user_id})

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }
