import React from 'react';
import { Question } from '@/features/interview/types';
import { ProblemPanel, CodeEditorPanel, VideoPanel, ChatPanel } from '@/features/interview/components/shared';

interface CodingLayoutProps {
  currentQuestion: Question;
  language: string;
}

const CodingLayout: React.FC<CodingLayoutProps> = ({ currentQuestion, language }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Problem Statement */}
      <div className="xl:col-span-1">
        <ProblemPanel question={currentQuestion} />
      </div>
      
      {/* Code Editor */}
      <div className="xl:col-span-1">
        <CodeEditorPanel language={language} />
      </div>
      
      {/* Video and Chat */}
      <div className="xl:col-span-1 space-y-6">
        <VideoPanel className="lg:h-64" />
        <ChatPanel className="lg:h-64" />
      </div>
    </div>
  );
};

export default CodingLayout;
