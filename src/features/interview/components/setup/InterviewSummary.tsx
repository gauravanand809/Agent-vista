import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import React from 'react';

interface InterviewSummaryProps {
  selectedLanguage: string;
  customRole: string;
  selectedDifficulty: 'easy' | 'medium' | 'hard';
  duration: number[];
  getDifficultyColor: (difficulty: string) => string;
}

const InterviewSummary: React.FC<InterviewSummaryProps> = ({
  selectedLanguage,
  customRole,
  selectedDifficulty,
  duration,
  getDifficultyColor,
}) => {
  return (
    <Card className="p-4 bg-primary/5 rounded-lg border border-primary/20">
      <h3 className="font-semibold mb-3 flex items-center text-primary">
        <Clock className="h-4 w-4 mr-2" />
        Interview Summary
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Interview Role:</span>
          <span className="font-medium">{selectedLanguage === "Others" ? customRole : selectedLanguage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Difficulty:
          </span>
          <span
            className={`font-medium capitalize ${getDifficultyColor(
              selectedDifficulty
            )}`}
          >
            {selectedDifficulty}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration:</span>
          <span className="font-medium">
            {duration[0]} minutes
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Questions:
          </span>
          <span className="font-medium">5 questions</span>
        </div>
      </div>
    </Card>
  );
};

export default InterviewSummary;
