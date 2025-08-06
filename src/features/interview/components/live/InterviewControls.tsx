import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { CurrentInterview } from '@/features/interview/types';

interface InterviewControlsProps {
  currentInterview: CurrentInterview;
  hasAnswered: boolean;
  handleNextQuestion: () => void;
  handleExit: () => void;
}

const InterviewControls: React.FC<InterviewControlsProps> = ({
  currentInterview,
  hasAnswered,
  handleNextQuestion,
  handleExit,
}) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-muted-foreground">
        Question {currentInterview.currentQuestionIndex + 1} of {currentInterview.questions.length}
      </div>
      
      <Button
        onClick={handleNextQuestion}
        disabled={!hasAnswered}
        variant="hero"
      >
        {currentInterview.currentQuestionIndex < currentInterview.questions.length - 1 ? (
          <>
            Next Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          'Finish Interview'
        )}
      </Button>
    </div>
  );
};

export default InterviewControls;
