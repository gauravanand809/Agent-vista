from pydantic import BaseModel, EmailStr, Field,SecretStr

class Login(BaseModel):
    email:EmailStr
    password:SecretStr

class SignUp(BaseModel):
    name:str
    email:EmailStr
    password:SecretStr