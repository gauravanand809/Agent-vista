import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { roles } from '@/features/interview/data';
import { Languages } from 'lucide-react';
import React from 'react';

interface RoleSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  customRole: string;
  setCustomRole: (value: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  customRole,
  setCustomRole,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Languages className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Interview Configuration
        </h2>
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Select Role</Label>
        <Select
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select a Role for Interview" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem
                key={role}
                value={role}
                className="py-3"
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLanguage === "Others" && (
        <div>
          <Label className="text-sm font-medium">
            Enter Custom Role
          </Label>
          <Textarea
            placeholder="e.g., Robotics Software Engineer"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
