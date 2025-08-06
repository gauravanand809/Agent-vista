import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInterview } from '@/features/interview/context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Brain } from 'lucide-react';
import RoleSelector from '@/features/interview/components/setup/RoleSelector';
import DifficultySelector from '@/features/interview/components/setup/DifficultySelector';
import DurationSelector from '@/features/interview/components/setup/DurationSelector';
import DocumentUpload from '@/features/interview/components/setup/DocumentUpload';
import InterviewSummary from '@/features/interview/components/setup/InterviewSummary';

const InterviewSetup = () => {
  const [customRole, setCustomRole] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState([30]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [useJobDescFile, setUseJobDescFile] = useState(false);
  const [resumeError, setResumeError] = useState<string>('');
  const [jobDescError, setJobDescError] = useState<string>('');
  const { startInterview } = useInterview();
  const navigate = useNavigate();

  const handleStartInterview = () => {
    const finalRole = selectedLanguage === "Others" ? customRole : selectedLanguage;
    if (!finalRole || !resumeFile || (!jobDescriptionText.trim() && !jobDescriptionFile)) return;
    
    startInterview(
      finalRole, 
      selectedDifficulty, 
      duration[0],
      resumeFile, 
      useJobDescFile ? undefined : jobDescriptionText,
      useJobDescFile ? jobDescriptionFile : undefined
    );
    navigate('/interview/live');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return '';
    }
  };

  const isFormValid = () => {
    const finalRole = selectedLanguage === "Others" ? customRole : selectedLanguage;
    return finalRole && 
           resumeFile && 
           (jobDescriptionText.trim() || jobDescriptionFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Setup Your Interview</h1>
              <p className="text-muted-foreground">
                Configure your interview settings and upload your documents
              </p>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left Section - Interview Settings */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <RoleSelector
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                customRole={customRole}
                setCustomRole={setCustomRole}
              />
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                getDifficultyColor={getDifficultyColor}
              />
              <DurationSelector
                duration={duration}
                setDuration={setDuration}
              />
              {selectedLanguage && (
                <InterviewSummary
                  selectedLanguage={selectedLanguage}
                  customRole={customRole}
                  selectedDifficulty={selectedDifficulty}
                  duration={duration}
                  getDifficultyColor={getDifficultyColor}
                />
              )}
            </Card>

            {/* Right Section - Document Uploads */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <DocumentUpload
                resumeFile={resumeFile}
                setResumeFile={setResumeFile}
                resumeError={resumeError}
                setResumeError={setResumeError}
                jobDescriptionText={jobDescriptionText}
                setJobDescriptionText={setJobDescriptionText}
                jobDescriptionFile={jobDescriptionFile}
                setJobDescriptionFile={setJobDescriptionFile}
                jobDescError={jobDescError}
                setJobDescError={setJobDescError}
                useJobDescFile={useJobDescFile}
                setUseJobDescFile={setUseJobDescFile}
              />
            </Card>
          </div>

          {/* Start Interview Button */}
          <div className="text-center">
            <Button
              onClick={handleStartInterview}
              disabled={!isFormValid()}
              variant="hero"
              size="xl"
              className="min-w-[200px]"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Interview
            </Button>
          </div>

          {/* Tips */}
          <Card className="mt-8 p-6 bg-accent/5 border-accent/20">
            <h3 className="font-semibold mb-3 text-accent">
              💡 Interview Tips
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>• Upload your current resume for personalized questions</li>
              <li>• Include detailed job requirements in the description</li>
              <li>• Find a quiet environment for optimal recording</li>
              <li>• Think out loud to demonstrate your process</li>
              <li>• Take your time to understand each question</li>
              <li>• Focus on clear, structured communication</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
