import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/data/mockData';

interface ProblemPanelProps {
  question: Question;
  className?: string;
}

const ProblemPanel = ({ question, className }: ProblemPanelProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'hard': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {question.topic}
          </Badge>
        </div>

        <Separator />

        {/* Problem Statement */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Problem Statement
          </h3>
          <p className="text-sm leading-relaxed">{question.problemStatement}</p>
        </div>

        {/* Input/Output Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Input Format
            </h3>
            <p className="text-sm bg-secondary/50 p-3 rounded-md font-mono">
              {question.inputFormat}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Output Format
            </h3>
            <p className="text-sm bg-secondary/50 p-3 rounded-md font-mono">
              {question.outputFormat}
            </p>
          </div>
        </div>

        {/* Sample Test Case */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Sample Test Case
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Input:</h4>
              <pre className="text-sm bg-secondary/50 p-3 rounded-md font-mono whitespace-pre-wrap">
                {question.sampleInput}
              </pre>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Output:</h4>
              <pre className="text-sm bg-secondary/50 p-3 rounded-md font-mono whitespace-pre-wrap">
                {question.sampleOutput}
              </pre>
            </div>
          </div>
        </div>

        {/* Constraints */}
        {question.constraints && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Constraints
            </h3>
            <p className="text-sm text-muted-foreground">{question.constraints}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProblemPanel;