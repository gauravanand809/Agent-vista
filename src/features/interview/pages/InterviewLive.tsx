import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useWebRTC } from '@/hooks/useWebRTC';
import { getNextQuestion, submitResponse } from '@/lib/api';
import { InterviewQuestion } from '@/types/interview';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { InterviewLayout, QuestionLayout, InterviewControls, TimerWarning } from '@/features/interview/components/live';
import { VideoPanel } from '@/features/interview/components/shared';
import { X, Loader2 } from 'lucide-react';

const InterviewLive = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // WebRTC Hook
  const { localStream, remoteStream, startCall } = useWebRTC(sessionId || null);

  // Component State
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Effect to start WebRTC call and fetch first question
  useEffect(() => {
    // The session ID must be present
    if (!sessionId) {
      toast({ title: "Error", description: "No interview session ID found.", variant: "destructive" });
      navigate('/dashboard');
      return;
    }

    const initializeInterview = async () => {
      setIsLoading(true);
      try {
        // Start the WebRTC connection process
        await startCall();

        // Fetch the first question
        const question = await getNextQuestion(sessionId);
        setCurrentQuestion(question);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({ title: "Error", description: `Could not start interview: ${errorMessage}`, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    initializeInterview();
  }, [sessionId, startCall, navigate, toast]);

  const handleSubmitAnswer = async () => {
    if (!sessionId || !currentQuestion || !userAnswer.trim()) {
      toast({ title: "Cannot Submit", description: "Please provide an answer.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitResponse(sessionId, currentQuestion._id, userAnswer);
      toast({ title: "Answer Submitted", description: "Your response has been saved." });

      // Fetch the next question
      const nextQuestionData = await getNextQuestion(sessionId);
      if (nextQuestionData) {
        setCurrentQuestion(nextQuestionData);
        setUserAnswer(''); // Reset answer field
      } else {
        // No more questions, end the interview
        navigate(`/interview/result/${sessionId}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmExit = () => {
    // In a real app, we might want to notify the backend the session was abandoned
    navigate('/dashboard');
    toast({ title: "Interview Ended", variant: "destructive" });
  };

  if (isLoading && !currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Connecting to interview session...</p>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
        <Alert variant="destructive" className="max-w-lg">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <InterviewLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
            <span className="text-sm font-medium">Live Interview</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowExitDialog(true)} className="text-destructive hover:text-destructive">
          <X className="h-4 w-4 mr-2" />
          Exit Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Question and Answer */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Question:</h2>
            <p>{currentQuestion?.text || "Loading question..."}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Your Answer:</h2>
            <Textarea
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="min-h-[150px]"
              disabled={isSubmitting}
            />
          </Card>
        </div>

        {/* Right side: Video Panel */}
        <VideoPanel localStream={localStream} remoteStream={remoteStream} />
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmitAnswer} disabled={isSubmitting || !userAnswer.trim()}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit and Next
        </Button>
      </div>

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Interview?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? Your progress will be saved, but the interview will be marked as incomplete.
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
