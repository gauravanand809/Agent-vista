import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '@/contexts/InterviewContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import QuestionDisplay from '@/components/interview/QuestionDisplay';
import AudioRecorder from '@/components/interview/AudioRecorder';
import VideoPanel from '@/components/interview/VideoPanel';
import ChatPanel from '@/components/interview/ChatPanel';
import ProblemPanel from '@/components/interview/ProblemPanel';
import CodeEditorPanel from '@/components/interview/CodeEditorPanel';
import { ArrowRight, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

    // Timer for current question
    const timer = setInterval(() => {
      if (currentInterview.timeRemaining > 0) {
        updateTimeRemaining(currentInterview.timeRemaining - 1);
      } else {
        // Auto-advance when time runs out
        handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentInterview?.timeRemaining]);

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Moving to the next question.",
      variant: "destructive",
    });
    
    if (currentInterview) {
      // Submit empty answer if no answer was provided
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
      // Interview completed
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-6">
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
          /* Coding Question Layout */
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Problem Statement */}
            <div className="xl:col-span-1">
              <ProblemPanel question={currentQuestion} />
            </div>
            
            {/* Code Editor */}
            <div className="xl:col-span-1">
              <CodeEditorPanel language={currentInterview.language} />
            </div>
            
            {/* Video and Chat */}
            <div className="xl:col-span-1 space-y-6">
              <VideoPanel className="lg:h-64" />
              <ChatPanel className="lg:h-64" />
            </div>
          </div>
        ) : (
          /* Normal Question Layout */
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

        {/* Warning for low time */}
        {currentInterview.timeRemaining <= 30 && currentInterview.timeRemaining > 0 && (
          <Card className="mt-4 p-4 bg-destructive/10 border-destructive/20 animate-pulse">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                Only {currentInterview.timeRemaining} seconds remaining!
              </span>
            </div>
          </Card>
        )}
      </div>

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
    </div>
  );
};

export default InterviewLive;