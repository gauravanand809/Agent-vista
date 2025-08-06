import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useInterview } from '@/features/interview/context';
import { InterviewLayout, QuestionLayout, CodingLayout, InterviewControls, TimerWarning } from '@/features/interview/components/live';
import { X } from 'lucide-react';

const InterviewLive = () => {
  const { currentInterview, submitAnswer, nextQuestion, toggleRecording, finishInterview, resetInterview, updateTimeRemaining } = useInterview();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentInterview) {
      navigate('/interview/setup');
      return;
    }

    const timer = setInterval(() => {
      if (currentInterview.timeRemaining > 0) {
        updateTimeRemaining(currentInterview.timeRemaining - 1);
      } else {
        handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentInterview?.timeRemaining, currentInterview, navigate, updateTimeRemaining, toast]);

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Moving to the next question.",
      variant: "destructive",
    });
    
    if (currentInterview) {
      const currentQuestion = currentInterview.questions[currentInterview.currentQuestionIndex];
      const hasAnswer = currentInterview.answers.some(a => a.questionId === currentQuestion.id);
      
      if (!hasAnswer) {
        submitAnswer("No answer provided - time expired");
      }
      
      handleNextQuestion();
    }
  };

  const handleSubmitAnswer = (answer: string) => {
    submitAnswer(answer);
    toast({
      title: "Answer Submitted!",
      description: "Your response has been recorded.",
    });
  };

  const handleNextQuestion = () => {
    if (!currentInterview) return;

    if (currentInterview.currentQuestionIndex < currentInterview.questions.length - 1) {
      nextQuestion();
      toast({
        title: "Next Question",
        description: `Moving to question ${currentInterview.currentQuestionIndex + 2}`,
      });
    } else {
      const completedInterview = finishInterview();
      navigate('/interview/result', { state: { interview: completedInterview } });
    }
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    resetInterview();
    navigate('/dashboard');
    toast({
      title: "Interview Ended",
      description: "Your progress has not been saved.",
      variant: "destructive",
    });
  };

  if (!currentInterview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentQuestion = currentInterview.questions[currentInterview.currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No questions available</h2>
          <p className="text-muted-foreground">Please return to setup and try again.</p>
          <Button onClick={() => navigate('/interview/setup')} className="mt-4">
            Return to Setup
          </Button>
        </div>
      </div>
    );
  }
  
  const currentAnswer = currentInterview.answers.find(a => a.questionId === currentQuestion.id);
  const hasAnswered = !!currentAnswer;
  const isCodingQuestion = currentQuestion.type === 'coding';

  return (
    <InterviewLayout isCodingQuestion={isCodingQuestion}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
            <span className="text-sm font-medium">Live Interview</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentInterview.language} • {currentInterview.difficulty} • {isCodingQuestion ? 'Coding' : 'Conceptual'}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExit}
          className="text-destructive hover:text-destructive"
        >
          <X className="h-4 w-4 mr-2" />
          Exit Interview
        </Button>
      </div>

      {/* Dynamic Layout based on question type */}
      {isCodingQuestion ? (
        <CodingLayout
          currentQuestion={currentQuestion}
          language={currentInterview.language}
        />
      ) : (
        <QuestionLayout
          currentQuestion={currentQuestion}
          currentInterview={currentInterview}
          toggleRecording={toggleRecording}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      )}

      {/* Answer Status */}
      {hasAnswered && (
        <Card className="mt-6 p-4 bg-success/10 border-success/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-sm font-medium text-success">Answer submitted</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Preview: {currentAnswer.answer.substring(0, 100)}
            {currentAnswer.answer.length > 100 ? '...' : ''}
          </p>
        </Card>
      )}

      {/* Navigation */}
      <InterviewControls
        currentInterview={currentInterview}
        hasAnswered={hasAnswered}
        handleNextQuestion={handleNextQuestion}
        handleExit={handleExit}
      />

      {/* Warning for low time */}
      <TimerWarning timeRemaining={currentInterview.timeRemaining} />

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Interview?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? Your progress will not be saved and you'll need to start over.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Continue Interview
            </Button>
            <Button variant="destructive" onClick={confirmExit}>
              Exit Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InterviewLayout>
  );
};

export default InterviewLive;
