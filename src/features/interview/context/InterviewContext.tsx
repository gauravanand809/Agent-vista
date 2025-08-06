import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getQuestionsByRole } from '@/features/interview/data';
import { Question, Interview, UploadedFile, CurrentInterview } from '@/features/interview/types';
import { useAuth } from '@/contexts/AuthContext';

interface InterviewContextType {
  currentInterview: CurrentInterview | null;
  startInterview: (language: string, difficulty: 'easy' | 'medium' | 'hard', duration: number, resumeFile?: File, jobDescriptionText?: string, jobDescriptionFile?: File) => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  toggleRecording: () => void;
  finishInterview: () => Interview;
  resetInterview: () => void;
  updateTimeRemaining: (time: number) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};

interface InterviewProviderProps {
  children: ReactNode;
}

export const InterviewProvider: React.FC<InterviewProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [currentInterview, setCurrentInterview] = useState<CurrentInterview | null>(null);

  const startInterview = (language: string, difficulty: 'easy' | 'medium' | 'hard', duration: number, resumeFile?: File, jobDescriptionText?: string, jobDescriptionFile?: File) => {
    const questions = getQuestionsByRole(language, difficulty);
    
    const newInterview: CurrentInterview = {
      id: `interview-${Date.now()}`,
      language,
      difficulty,
      duration,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      isRecording: false,
      timeRemaining: questions[0]?.timeLimit || 180,
      resumeFile: resumeFile ? {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type
      } : undefined,
      jobDescriptionText,
      jobDescriptionFile: jobDescriptionFile ? {
        name: jobDescriptionFile.name,
        size: jobDescriptionFile.size,
        type: jobDescriptionFile.type
      } : undefined
    };
    
    setCurrentInterview(newInterview);
  };

  const submitAnswer = (answer: string) => {
    if (!currentInterview) return;

    const currentQuestion = currentInterview.questions[currentInterview.currentQuestionIndex];
    
    setCurrentInterview(prev => {
      if (!prev) return null;
      
      const newAnswers = [...prev.answers];
      const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = { questionId: currentQuestion.id, answer };
      } else {
        newAnswers.push({ questionId: currentQuestion.id, answer });
      }
      
      return {
        ...prev,
        answers: newAnswers,
        isRecording: false
      };
    });
  };

  const nextQuestion = () => {
    if (!currentInterview) return;

    if (currentInterview.currentQuestionIndex < currentInterview.questions.length - 1) {
      setCurrentInterview(prev => {
        if (!prev) return null;
        
        const nextIndex = prev.currentQuestionIndex + 1;
        const nextQuestion = prev.questions[nextIndex];
        
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          timeRemaining: nextQuestion?.timeLimit || 180,
          isRecording: false
        };
      });
    }
  };

  const toggleRecording = () => {
    setCurrentInterview(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isRecording: !prev.isRecording
      };
    });
  };

  const updateTimeRemaining = (time: number) => {
    setCurrentInterview(prev => {
      if (!prev) return null;
      return {
        ...prev,
        timeRemaining: time
      };
    });
  };

  const finishInterview = (): Interview => {
    if (!currentInterview || !user) {
      throw new Error('No active interview or user');
    }

    // Calculate mock scores
    const answersWithScores = currentInterview.answers.map(answer => ({
      ...answer,
      score: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    }));

    const totalScore = Math.floor(
      answersWithScores.reduce((sum, answer) => sum + answer.score, 0) / answersWithScores.length
    );

    const mockFeedback = generateMockFeedback(totalScore, currentInterview.language);

    const completedInterview: Interview = {
      id: currentInterview.id,
      userId: user.id,
      role: currentInterview.language,
      difficulty: currentInterview.difficulty,
      questions: currentInterview.questions,
      answers: answersWithScores,
      totalScore,
      feedback: mockFeedback,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };

    return completedInterview;
  };

  const resetInterview = () => {
    setCurrentInterview(null);
  };

  const generateMockFeedback = (score: number, language: string): string => {
    if (score >= 90) {
      return `Excellent performance! You demonstrated exceptional knowledge of ${language}. You're ready for senior-level positions.`;
    } else if (score >= 80) {
      return `Great job! Strong understanding of ${language} concepts. Minor areas for improvement, but overall very solid.`;
    } else if (score >= 70) {
      return `Good performance! You have a solid foundation in ${language}. Focus on practicing more advanced concepts.`;
    } else if (score >= 60) {
      return `Decent attempt! You understand the basics of ${language}. Spend more time studying core concepts and practicing.`;
    } else {
      return `Keep practicing! Review the fundamentals of ${language} and try again when you feel more confident.`;
    }
  };

  const value: InterviewContextType = {
    currentInterview,
    startInterview,
    submitAnswer,
    nextQuestion,
    toggleRecording,
    finishInterview,
    resetInterview,
    updateTimeRemaining
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};
