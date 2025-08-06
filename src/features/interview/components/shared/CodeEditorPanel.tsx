import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorPanelProps {
  language: string;
  className?: string;
}

const languageTemplates: Record<string, string> = {
  javascript: `function solution() {
    // Write your solution here
    
}`,
  python: `def solution():
    # Write your solution here
    pass`,
  java: `public class Solution {
    public void solution() {
        // Write your solution here
        
    }
}`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void solution() {
        // Write your solution here
        
    }
};`,
};

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const CodeEditorPanel = ({ language, className }: CodeEditorPanelProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language.toLowerCase());
  const [code, setCode] = useState(languageTemplates[language.toLowerCase()] || languageTemplates.javascript);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    setCode(languageTemplates[newLanguage] || languageTemplates.javascript);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode(languageTemplates[selectedLanguage] || languageTemplates.javascript);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Output</h4>
          <div className="bg-secondary/50 p-3 rounded-md min-h-[80px] font-mono text-sm">
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Running your code...</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Click "Run" to execute your code</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CodeEditorPanel;