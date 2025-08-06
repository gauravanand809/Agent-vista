from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.router.auth import router as auth_router
from app.router.password import router as password_router
from app.middleware.auth_middleware import AuthMiddleware

app = FastAPI(title="AgentVista",description="An AI tool for Tech Interview Purpose",version="0.1.0")

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
