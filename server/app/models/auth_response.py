from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"

class UserResponseWithToken(BaseModel):
    id: str  
    candidate_id: str
    name: str
    email: EmailStr
    created_at: datetime
    tokens: TokenResponse

    class Config:
        orm_mode = True
