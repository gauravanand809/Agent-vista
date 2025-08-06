from fastapi import HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.core.token import verify_token

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths: list[str] = []):
        super().__init__(app)
        self.protected_paths = protected_paths

    async def dispatch(self, request: Request, call_next):
        # Skip authentication for unprotected paths
        for path in self.protected_paths:
            if request.url.path.startswith(path):
                response = await call_next(request)
                return response

        # For other paths, check for Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JSONResponse(status_code=401, content={"detail": "Authorization header missing"})

        try:
            token_type, token = auth_header.split(" ")
            if token_type.lower() != "bearer":
                return JSONResponse(status_code=401, content={"detail": "Invalid token type"})
            
            payload = verify_token(token)
            if not payload:
                return JSONResponse(status_code=401, content={"detail": "Invalid or expired token"})
            
            # Attach user info to request state if needed by downstream routes
            request.state.user_id = payload.get("sub")
            request.state.email = payload.get("email")
            request.state.candidate_id = payload.get("candidate_id")

        except Exception as e:
            return JSONResponse(status_code=401, content={"detail": f"Invalid token: {e}"})

        response = await call_next(request)
        return response
