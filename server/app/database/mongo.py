from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from ..models.interview import (
    UserModel,
    InterviewSessionModel,
    InterviewQuestionModel,
    InterviewResponseModel,
    UploadedDocumentModel,
)
from typing import List, Optional

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["agent_vista"]

# Collections
user_collection = db["users"]
interview_session_collection = db["interview_sessions"]
interview_question_collection = db["interview_questions"]
interview_response_collection = db["interview_responses"]
password_reset_tokens_collection = db["password_reset_tokens"]

# --- Helper functions for User ---
async def create_user(user_data: UserModel) -> UserModel:
    user_dict = user_data.model_dump(by_alias=True, exclude=["id"])
    result = await user_collection.insert_one(user_dict)
    created_user = await user_collection.find_one({"_id": result.inserted_id})
    return UserModel(**created_user)

async def get_user_by_id(user_id: str) -> Optional[UserModel]:
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return UserModel(**user)
    return None

async def get_user_by_email(email: str) -> Optional[UserModel]:
    user = await user_collection.find_one({"email": email})
    if user:
        return UserModel(**user)
    return None

async def add_document_to_user(user_id: str, document: UploadedDocumentModel) -> bool:
    """
    Adds a document to a user's uploaded_documents list.
    Returns True on success, False on failure.
    """
    document_dict = document.model_dump()
    result = await user_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"uploaded_documents": document_dict}}
    )
    return result.modified_count > 0

# --- Helper functions for InterviewSession ---
async def create_interview_session(session_data: InterviewSessionModel) -> InterviewSessionModel:
    session_dict = session_data.model_dump(by_alias=True, exclude=["id"])
    result = await interview_session_collection.insert_one(session_dict)
    created_session = await interview_session_collection.find_one({"_id": result.inserted_id})
    return InterviewSessionModel(**created_session)

async def get_interview_session_by_id(session_id: str) -> Optional[InterviewSessionModel]:
    session = await interview_session_collection.find_one({"_id": ObjectId(session_id)})
    if session:
        return InterviewSessionModel(**session)
    return None

# --- Helper functions for InterviewQuestion ---
async def create_interview_question(question_data: InterviewQuestionModel) -> InterviewQuestionModel:
    question_dict = question_data.model_dump(by_alias=True, exclude=["id"])
    result = await interview_question_collection.insert_one(question_dict)
    created_question = await interview_question_collection.find_one({"_id": result.inserted_id})
    return InterviewQuestionModel(**created_question)

async def get_interview_question_by_id(question_id: str) -> Optional[InterviewQuestionModel]:
    question = await interview_question_collection.find_one({"_id": ObjectId(question_id)})
    if question:
        return InterviewQuestionModel(**question)
    return None

# --- Helper functions for InterviewResponse ---
async def create_interview_response(response_data: InterviewResponseModel) -> InterviewResponseModel:
    response_dict = response_data.model_dump(by_alias=True, exclude=["id"])
    result = await interview_response_collection.insert_one(response_dict)
    created_response = await interview_response_collection.find_one({"_id": result.inserted_id})
    return InterviewResponseModel(**created_response)

async def get_interview_response_by_id(response_id: str) -> Optional[InterviewResponseModel]:
    response = await interview_response_collection.find_one({"_id": ObjectId(response_id)})
    if response:
        return InterviewResponseModel(**response)
    return None
