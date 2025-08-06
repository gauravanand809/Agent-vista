import { Card } from '@/components/ui/card';
import { Interview } from '@/features/interview/types';
import { Target } from 'lucide-react';
import React from 'react';

interface FeedbackSectionProps {
  interview: Interview;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ interview }) => {
  return (
    <Card className="p-6 bg-accent/5 border-accent/20">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        <Target className="h-5 w-5 mr-2 text-accent" />
        AI Feedback
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {interview.feedback}
      </p>
    </Card>
  );
};

export default FeedbackSection;
