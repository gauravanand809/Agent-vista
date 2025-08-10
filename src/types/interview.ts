export interface InterviewSession {
  _id: string;
  candidate_id: string;
  start_time: string; // ISO date string
  end_time?: string; // ISO date string
  status: 'initialized' | 'in_progress' | 'completed';
  role: string;
  difficulty: string;
  duration_minutes: number;
  total_score?: number;
  feedback_summary?: string;
  interview_type: string;
  questions_asked: { question_id: string; response_id: string }[];
}

export interface InterviewQuestion {
  _id: string;
  text: string;
  topic: string;
  difficulty: string;
  expected_keywords?: string[];
  ideal_answer?: string;
}

export interface InterviewResponse {
  _id: string;
  session_id: string;
  question_id: string;
  candidate_id: string;
  response_text: string;
  audio_file_path?: string;
  ai_feedback?: string;
  score?: number;
  timestamp: string; // ISO date string
}

export interface UploadedDocument {
  file_name: string;
  file_path: string;
  upload_date: string; // ISO date string
  document_type: 'resume' | 'job_description';
}
