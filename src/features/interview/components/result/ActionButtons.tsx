import { Button } from '@/components/ui/button';
import { Home, RotateCcw, Plus } from 'lucide-react';
import React from 'react';

interface ActionButtonsProps {
  onRetry: () => void;
  onNewInterview: () => void;
  onBackToDashboard: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onRetry, onNewInterview, onBackToDashboard }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button variant="outline" onClick={onRetry} className="flex-1">
        Retry Same Role
      </Button>
      <Button variant="hero" onClick={onNewInterview} className="flex-1">
        Start New Interview
      </Button>
    </div>
  );
};

export default ActionButtons;
