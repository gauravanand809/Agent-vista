from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.router.auth import router as auth_router
from app.router.password import router as password_router
from app.router.interview import router as interview_router
from app.router.webrtc import router as webrtc_router
from app.router.user import router as user_router
from app.middleware.auth_middleware import AuthMiddleware

app = FastAPI(title="AgentVista",description="An AI tool for Tech Interview Purpose",version="0.1.0")

from app.database.mongo import client as mongo_client

@app.on_event("startup")
async def startup_db_client():
    # This is where you can add logic to be executed on startup.
    # For Motor, the client is created lazily, so just referencing it is enough.
    # We can perhaps ping the server to confirm connection.
    try:
        await mongo_client.admin.command('ping')
        print("Successfully connected to MongoDB.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    mongo_client.close()
    print("MongoDB connection closed.")

# CORS Middleware
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

# Get allowed origins from environment variable, default to "*" for development
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Middleware
# Paths that do NOT require authentication
UNPROTECTED_PATHS = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/refresh",
    "/docs",
    "/openapi.json",
]

app.add_middleware(AuthMiddleware, protected_paths=UNPROTECTED_PATHS)

app.include_router(auth_router,prefix="/auth")
app.include_router(password_router,prefix="/auth")
app.include_router(interview_router)
app.include_router(webrtc_router)
app.include_router(user_router)
