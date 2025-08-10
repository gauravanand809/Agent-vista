from fastapi import Depends, HTTPException, Request

async def get_current_user_id(request: Request) -> str:
    """
    Dependency to get user_id from the request state, which is set by the AuthMiddleware.
    """
    user_id = getattr(request.state, "user_id", None)
    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Could not identify user from token. User may not be authenticated."
        )
    return user_id
