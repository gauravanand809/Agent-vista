import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface TimerWarningProps {
  timeRemaining: number;
}

const TimerWarning: React.FC<TimerWarningProps> = ({ timeRemaining }) => {
  if (timeRemaining <= 30 && timeRemaining > 0) {
    return (
      <Card className="mt-4 p-4 bg-destructive/10 border-destructive/20 animate-pulse">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">
            Only {timeRemaining} seconds remaining!
          </span>
        </div>
      </Card>
    );
  }
  return null;
};

export default TimerWarning;
