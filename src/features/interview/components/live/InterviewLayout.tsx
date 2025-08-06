import React from 'react';

interface InterviewLayoutProps {
  children: React.ReactNode;
  isCodingQuestion: boolean;
}

const InterviewLayout: React.FC<InterviewLayoutProps> = ({ children, isCodingQuestion }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default InterviewLayout;
