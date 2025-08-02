import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Interview } from '@/data/mockData';
import { Trophy, Target, Clock, TrendingUp, ThumbsUp, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  interview: Interview;
  onRetry: () => void;
  onNewInterview: () => void;
}

const ResultCard = ({ interview, onRetry, onNewInterview }: ResultCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-info';
    return 'text-destructive';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Needs Improvement';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <ThumbsUp className="h-5 w-5 text-success" />;
    return <AlertCircle className="h-5 w-5 text-warning" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-4">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        
        <h2 className="text-3xl font-bold mb-2">Interview Complete!</h2>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          {getScoreIcon(interview.totalScore)}
          <span className={`text-4xl font-bold ${getScoreColor(interview.totalScore)}`}>
            {interview.totalScore}%
          </span>
        </div>
        
        <Badge variant="secondary" className="text-lg px-4 py-1">
          {getScoreGrade(interview.totalScore)}
        </Badge>
        
        <div className="mt-6 max-w-md mx-auto">
          <Progress value={interview.totalScore} className="h-3" />
        </div>
      </Card>

      {/* Interview Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{interview.topic}</div>
          <div className="text-sm text-muted-foreground capitalize">{interview.difficulty}</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-accent" />
          <div className="text-lg font-semibold">{interview.questions.length}</div>
          <div className="text-sm text-muted-foreground">Questions</div>
        </Card>
        
        <Card className="p-4 text-center">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
          <div className="text-lg font-semibold">
            {interview.answers.filter(a => a.score >= 80).length}
          </div>
          <div className="text-sm text-muted-foreground">Strong Answers</div>
        </Card>
      </div>

      {/* Question Breakdown */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Question Breakdown</h3>
        <div className="space-y-4">
          {interview.answers.map((answer, index) => {
            const question = interview.questions.find(q => q.id === answer.questionId);
            return (
              <div key={answer.questionId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium mb-1">
                    Question {index + 1}: {question?.question.substring(0, 60)}...
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {answer.answer.substring(0, 80)}...
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getScoreColor(answer.score)}`}>
                    {answer.score}%
                  </div>
                  <Progress value={answer.score} className="w-20 h-2 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Feedback */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Target className="h-5 w-5 mr-2 text-accent" />
          AI Feedback
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {interview.feedback}
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={onRetry} className="flex-1">
          Retry Same Topic
        </Button>
        <Button variant="hero" onClick={onNewInterview} className="flex-1">
          Start New Interview
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;