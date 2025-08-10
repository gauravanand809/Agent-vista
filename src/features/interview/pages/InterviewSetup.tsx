import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Brain, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RoleSelector from '@/features/interview/components/setup/RoleSelector';
import DifficultySelector from '@/features/interview/components/setup/DifficultySelector';
import DurationSelector from '@/features/interview/components/setup/DurationSelector';
import DocumentUpload from '@/features/interview/components/setup/DocumentUpload';
import InterviewSummary from '@/features/interview/components/setup/InterviewSummary';
import { uploadDocument, startInterview } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const InterviewSetup = () => {
  const [customRole, setCustomRole] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState([30]);

  // State to track upload status instead of the file object itself
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jobDescProvided, setJobDescProvided] = useState(false);
  const [jobDescriptionText, setJobDescriptionText] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = async (file: File | null, type: 'resume' | 'job_description') => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await uploadDocument(file, type);
      if (type === 'resume') {
        setResumeUploaded(true);
      } else {
        setJobDescProvided(true);
      }
      toast({
        title: "Success",
        description: `${type === 'resume' ? 'Resume' : 'Job Description'} uploaded successfully.`,
        variant: "default",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartInterview = async () => {
    const finalRole = selectedLanguage === "Others" ? customRole : selectedLanguage;
    if (!isFormValid()) {
      setError("Please complete all required fields before starting.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const session = await startInterview(finalRole, selectedDifficulty, duration[0]);
      toast({
        title: "Success!",
        description: "Your interview session has been created.",
      });
      navigate(`/interview/live/${session._id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Failed to Start Interview",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return '';
    }
  };

  // This is a simplified version of the DocumentUpload props for clarity
  // The actual DocumentUpload component might need more props to handle its internal state
  const documentUploadProps = {
    setResumeFile: (file: File | null) => handleFileUpload(file, 'resume'),
    setJobDescriptionFile: (file: File | null) => handleFileUpload(file, 'job_description'),
    jobDescriptionText: jobDescriptionText,
    setJobDescriptionText: (text: string) => {
        setJobDescriptionText(text);
        setJobDescProvided(!!text.trim());
    },
    // The rest of the props would be for the component's internal state management
    resumeFile: null, // Pass null as we now track status, not the file
    jobDescriptionFile: null,
    resumeError: '',
    setResumeError: () => {},
    jobDescError: '',
    setJobDescError: () => {},
    useJobDescFile: false,
    setUseJobDescFile: () => {},
  };

  const isFormValid = () => {
    const finalRole = selectedLanguage === "Others" ? customRole : selectedLanguage;
    return finalRole && resumeUploaded && (jobDescProvided || jobDescriptionText.trim());
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

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
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

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              {/* This is a simplified representation. The actual props might differ. */}
              <DocumentUpload {...documentUploadProps} />
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={handleStartInterview}
              disabled={!isFormValid() || isLoading}
              variant="hero"
              size="xl"
              className="min-w-[200px]"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5" />}
              {isLoading ? 'Processing...' : 'Start Interview'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
