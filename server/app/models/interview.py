from pydantic import BaseModel, Field
from typing import List, Optional, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class UploadedDocumentModel(BaseModel):
    file_name: str
    file_path: str
    upload_date: datetime = Field(default_factory=datetime.utcnow)
    document_type: str  # 'resume' or 'job_description'

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: str
    name: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    roles: List[str] = []
    uploaded_documents: List[UploadedDocumentModel] = []

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True


class InterviewQuestionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    text: str
    topic: str
    difficulty: str
    expected_keywords: Optional[List[str]] = []
    ideal_answer: Optional[str] = None
    embedding: Optional[List[float]] = []
    created_by: Optional[PyObjectId] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True


class InterviewResponseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    session_id: PyObjectId
    question_id: PyObjectId
    candidate_id: PyObjectId
    response_text: str
    audio_file_path: Optional[str] = None
    response_embedding: Optional[List[float]] = []
    ai_feedback: Optional[str] = None
    score: Optional[float] = None
    follow_up_questions: List[Any] = [] # Define a more specific model later if needed
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duplicacy_score: Optional[float] = None
    similarity_to_ideal: Optional[float] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True


class InterviewSessionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    candidate_id: PyObjectId
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: Optional[datetime] = None
    status: str = "initialized"  # e.g., initialized, in_progress, completed
    role: str
    difficulty: str
    duration_minutes: int
    total_score: Optional[float] = None
    feedback_summary: Optional[str] = None
    interview_type: str = "AI_Agent"
    questions_asked: List[Any] = [] # Contains dicts with question_id and response_id

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True
