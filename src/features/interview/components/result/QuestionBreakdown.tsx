import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Interview } from '@/features/interview/types';
import React from 'react';

interface QuestionBreakdownProps {
  interview: Interview;
}

const QuestionBreakdown: React.FC<QuestionBreakdownProps> = ({ interview }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-info';
    return 'text-destructive';
  };

  return (
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
  );
};

export default QuestionBreakdown;
