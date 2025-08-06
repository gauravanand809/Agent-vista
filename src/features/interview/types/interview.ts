export interface Question {
  id: string;
  topic: string;
  role: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  expectedAnswer: string;
  timeLimit: number;
  type?: 'normal' | 'coding';
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string;
}

export interface Interview {
  id: string;
  userId: string;
  role: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  answers: {
    questionId: string;
    answer: string;
    score: number;
  }[];
  totalScore: number;
  feedback: string;
  completedAt: string;
  status: 'completed' | 'in-progress' | 'abandoned';
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export interface CurrentInterview {
  id: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  questions: Question[];
  currentQuestionIndex: number;
  answers: { questionId: string; answer: string }[];
  startTime: Date;
  isRecording: boolean;
  timeRemaining: number;
  resumeFile?: UploadedFile;
  jobDescriptionText?: string;
  jobDescriptionFile?: UploadedFile;
}
