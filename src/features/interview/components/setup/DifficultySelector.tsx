import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { difficulties } from '@/features/interview/data';
import { Target } from 'lucide-react';
import React from 'react';

interface DifficultySelectorProps {
  selectedDifficulty: 'easy' | 'medium' | 'hard';
  setSelectedDifficulty: (value: 'easy' | 'medium' | 'hard') => void;
  getDifficultyColor: (difficulty: string) => string;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  setSelectedDifficulty,
  getDifficultyColor,
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Difficulty Level
      </Label>
      <Select
        value={selectedDifficulty}
        onValueChange={(value) =>
          setSelectedDifficulty(value as "easy" | "medium" | "hard")
        }
      >
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          {difficulties.map((difficulty) => (
            <SelectItem
              key={difficulty}
              value={difficulty}
              className="py-3"
            >
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span
                  className={`capitalize font-medium ${getDifficultyColor(
                    difficulty
                  )}`}
                >
                  {difficulty}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DifficultySelector;
