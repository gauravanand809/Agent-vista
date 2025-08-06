import React from 'react';
import { Question, CurrentInterview } from '@/features/interview/types';
import { QuestionDisplay, AudioRecorder, VideoPanel, ChatPanel } from '@/features/interview/components/shared';

interface QuestionLayoutProps {
  currentQuestion: Question;
  currentInterview: CurrentInterview;
  toggleRecording: () => void;
  handleSubmitAnswer: (answer: string) => void;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({
  currentQuestion,
  currentInterview,
  toggleRecording,
  handleSubmitAnswer,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Video Section */}
      <div>
        <VideoPanel />
      </div>

      {/* Question and Chat Section */}
      <div className="space-y-6">
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentInterview.currentQuestionIndex + 1}
          totalQuestions={currentInterview.questions.length}
          timeRemaining={currentInterview.timeRemaining}
        />
        
        <ChatPanel className="lg:h-64" />
        
        <AudioRecorder
          isRecording={currentInterview.isRecording}
          onToggleRecording={toggleRecording}
          onSubmitAnswer={handleSubmitAnswer}
        />
      </div>
    </div>
  );
};

export default QuestionLayout;
