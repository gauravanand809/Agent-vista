from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from typing import Optional

from ..services.ai_agent_service import AIAgentService
from ..models.interview import InterviewSessionModel, InterviewQuestionModel, InterviewResponseModel

router = APIRouter(
    prefix="/interviews",
    tags=["interviews"],
)

# --- Request Models ---
class StartInterviewRequest(BaseModel):
    role: str
    difficulty: str
    duration_minutes: int

class SubmitResponseRequest(BaseModel):
    question_id: str
    response_text: str

from ..dependencies import get_current_user_id

@router.post("/start", response_model=InterviewSessionModel)
async def start_interview(
    request_data: StartInterviewRequest,
    candidate_id: str = Depends(get_current_user_id)
):
    """
    Starts a new interview session for the authenticated user.
    """
    session = await AIAgentService.start_interview(
        role=request_data.role,
        difficulty=request_data.difficulty,
        candidate_id=candidate_id,
        duration_minutes=request_data.duration_minutes
    )
    return session

@router.get("/{session_id}/question", response_model=InterviewQuestionModel)
async def get_next_question(session_id: str):
    """
    Gets the next question for a given interview session.
    """
    question = await AIAgentService.get_next_question(session_id)
    if not question:
        raise HTTPException(status_code=404, detail="Could not retrieve a question for this session.")
    return question

@router.post("/{session_id}/response", response_model=InterviewResponseModel)
async def submit_response(
    session_id: str,
    response_data: SubmitResponseRequest,
    candidate_id: str = Depends(get_current_user_id)
):
    """
    Submits a user's response to a question in an interview session.
    """
    response = await AIAgentService.process_user_response(
        session_id=session_id,
        question_id=response_data.question_id,
        candidate_id=candidate_id,
        response_text=response_data.response_text
    )
    return response
