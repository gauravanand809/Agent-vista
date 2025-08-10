from ..models.interview import InterviewSessionModel, InterviewQuestionModel, InterviewResponseModel
from ..database.mongo import (
    create_interview_session,
    get_interview_session_by_id,
    create_interview_question,
    get_interview_question_by_id,
    create_interview_response,
)
from bson import ObjectId

class AIAgentService:
    @staticmethod
    async def start_interview(role: str, difficulty: str, candidate_id: str, duration_minutes: int) -> InterviewSessionModel:
        """
        Initializes a new interview session.
        """
        session_data = InterviewSessionModel(
            candidate_id=ObjectId(candidate_id),
            role=role,
            difficulty=difficulty,
            duration_minutes=duration_minutes,
        )
        created_session = await create_interview_session(session_data)
        return created_session

    @staticmethod
    async def get_next_question(session_id: str) -> InterviewQuestionModel:
        """
        Fetches the next question for the interview.
        For now, returns a placeholder question.
        """
        # In the future, this would have logic to select a relevant question
        # based on the session's topic, difficulty, and questions already asked.

        # For now, let's create or find a dummy question.
        # This is a simplified placeholder logic.
        question_data = InterviewQuestionModel(
            text="Tell me about a challenging project you've worked on.",
            topic="Behavioral",
            difficulty="Medium"
        )
        # In a real scenario, we'd likely fetch from a pool of questions.
        # For this placeholder, we'll just create a new one each time.
        created_question = await create_interview_question(question_data)

        # Here we would also update the session to link the question
        # but that logic can be added later.
        return created_question

    @staticmethod
    async def process_user_response(session_id: str, question_id: str, candidate_id: str, response_text: str) -> InterviewResponseModel:
        """
        Processes a user's response to a question.
        """
        response_data = InterviewResponseModel(
            session_id=ObjectId(session_id),
            question_id=ObjectId(question_id),
            candidate_id=ObjectId(candidate_id),
            response_text=response_text,
            ai_feedback="This is a placeholder feedback.", # Placeholder
            score=0.8 # Placeholder
        )
        created_response = await create_interview_response(response_data)
        return created_response
