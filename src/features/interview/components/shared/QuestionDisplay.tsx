import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/data/interviewQuestions';
import { Clock, MessageSquare } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
}

const QuestionDisplay = ({ question, questionNumber, totalQuestions, timeRemaining }: QuestionDisplayProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 30) return 'text-destructive';
    if (timeRemaining <= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="font-medium">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {question.topic}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className={`h-4 w-4 ${getTimeColor()}`} />
          <span className={`font-mono text-lg font-semibold ${getTimeColor()}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold mb-3 leading-relaxed">
              {question.question}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionDisplay;
