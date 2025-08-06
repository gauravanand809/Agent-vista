import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home } from 'lucide-react';
import { Interview } from '@/features/interview/types';
import { useInterview } from '@/features/interview/context';
import { ScoreDisplay, QuestionBreakdown, FeedbackSection, ActionButtons } from '@/features/interview/components/result';
import { ResultCard } from '@/features/interview/components/ui';

const InterviewResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetInterview } = useInterview();
  
  const interview = location.state?.interview as Interview;

  if (!interview) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRetry = () => {
    resetInterview();
    navigate('/interview/setup', { 
      state: { 
        preselectedRole: interview.role, 
        preselectedDifficulty: interview.difficulty 
      } 
    });
  };

  const handleNewInterview = () => {
    resetInterview();
    navigate('/interview/setup');
  };

  const handleBackToDashboard = () => {
    resetInterview();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Completed on {new Date(interview.completedAt).toLocaleDateString()}
            </div>
          </div>

          {/* Overall Score and Details */}
          <ScoreDisplay interview={interview} />

          {/* Question Breakdown */}
          <QuestionBreakdown interview={interview} />

          {/* Feedback */}
          <FeedbackSection interview={interview} />

          {/* Action Buttons */}
          <ActionButtons
            onRetry={handleRetry}
            onNewInterview={handleNewInterview}
            onBackToDashboard={handleBackToDashboard}
          />

          {/* Additional Actions */}
          <Card className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
                <p className="text-muted-foreground">
                  Continue practicing to improve your interview skills and confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button variant="outline" onClick={handleBackToDashboard}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </div>
          </Card>

          {/* Tips for Improvement */}
          <Card className="mt-6 p-6 bg-accent/5 border-accent/20">
            <h3 className="font-semibold mb-3 text-accent">💡 Tips for Next Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Before the Interview:</h4>
                <ul className="space-y-1">
                  <li>• Review fundamental concepts</li>
                  <li>• Practice explaining your thought process</li>
                  <li>• Set up a quiet environment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">During the Interview:</h4>
                <ul className="space-y-1">
                  <li>• Take time to understand the question</li>
                  <li>• Think out loud</li>
                  <li>• Ask clarifying questions when needed</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewResult;
