import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Timer } from 'lucide-react';
import React from 'react';

interface DurationSelectorProps {
  duration: number[];
  setDuration: (value: number[]) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  duration,
  setDuration,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Interview Duration
        </Label>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>{duration[0]} minutes</span>
        </div>
      </div>
      <div className="px-2">
        <Slider
          value={duration}
          onValueChange={setDuration}
          max={90}
          min={15}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>15 min</span>
          <span>90 min</span>
        </div>
      </div>
    </div>
  );
};

export default DurationSelector;
