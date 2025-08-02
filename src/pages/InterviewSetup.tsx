import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '@/contexts/InterviewContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/ui/file-upload';
import { languages, difficulties } from '@/data/mockData';
import { ArrowLeft, Play, Clock, Target, Brain, FileText, Briefcase, Languages, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterviewSetup = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState([30]); // Using array for Slider component
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [useJobDescFile, setUseJobDescFile] = useState(false);
  const [resumeError, setResumeError] = useState<string>('');
  const [jobDescError, setJobDescError] = useState<string>('');
  const { startInterview } = useInterview();
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (!selectedLanguage || !resumeFile || (!jobDescriptionText.trim() && !jobDescriptionFile)) return;
    
    startInterview(
      selectedLanguage, 
      selectedDifficulty, 
      duration[0],
      resumeFile, 
      useJobDescFile ? undefined : jobDescriptionText,
      useJobDescFile ? jobDescriptionFile : undefined
    );
    navigate('/interview/live');
  };

  const validateFile = (file: File | null, setError: (error: string) => void): boolean => {
    if (!file) return false;
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return false;
    }
    
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleResumeSelect = (file: File | null) => {
    if (file && validateFile(file, setResumeError)) {
      setResumeFile(file);
    } else if (!file) {
      setResumeFile(null);
      setResumeError('');
    }
  };

  const handleJobDescSelect = (file: File | null) => {
    if (file && validateFile(file, setJobDescError)) {
      setJobDescriptionFile(file);
    } else if (!file) {
      setJobDescriptionFile(null);
      setJobDescError('');
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

  const isFormValid = () => {
    return selectedLanguage && 
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
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Languages className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Interview Configuration</h2>
                </div>

                {/* Language Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Programming Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select a programming language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language} className="py-3">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Difficulty Level</Label>
                  <Select value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as 'easy' | 'medium' | 'hard')}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty} className="py-3">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <span className={`capitalize font-medium ${getDifficultyColor(difficulty)}`}>
                              {difficulty}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Interview Duration</Label>
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

                {/* Interview Summary */}
                {selectedLanguage && (
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-3 flex items-center text-primary">
                      <Clock className="h-4 w-4 mr-2" />
                      Interview Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language:</span>
                        <span className="font-medium">{selectedLanguage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className={`font-medium capitalize ${getDifficultyColor(selectedDifficulty)}`}>
                          {selectedDifficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{duration[0]} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">5 questions</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Right Section - Document Uploads */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Upload Documents</h2>
                </div>

                {/* Resume Upload */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-medium">Resume</Label>
                  </div>
                  <FileUpload
                    label=""
                    accept={['.pdf', '.docx', '.doc']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    onFileSelect={handleResumeSelect}
                    selectedFile={resumeFile}
                    error={resumeError}
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-medium">Job Description</Label>
                  </div>
                  
                  {/* Toggle between text and file */}
                  <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setUseJobDescFile(false)}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        !useJobDescFile 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Paste Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseJobDescFile(true)}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        useJobDescFile 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Upload File
                    </button>
                  </div>

                  {!useJobDescFile ? (
                    <Textarea
                      placeholder="Paste the job description here..."
                      value={jobDescriptionText}
                      onChange={(e) => setJobDescriptionText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  ) : (
                    <FileUpload
                      label=""
                      accept={['.pdf', '.docx', '.doc']}
                      maxSize={5 * 1024 * 1024} // 5MB
                      onFileSelect={handleJobDescSelect}
                      selectedFile={jobDescriptionFile}
                      error={jobDescError}
                    />
                  )}
                </div>

                {/* Upload Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm text-muted-foreground">Resume uploaded:</span>
                    <span className={`text-sm font-medium ${resumeFile ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {resumeFile ? '✓ Ready' : '○ Required'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm text-muted-foreground">Job description:</span>
                    <span className={`text-sm font-medium ${(jobDescriptionText.trim() || jobDescriptionFile) ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {(jobDescriptionText.trim() || jobDescriptionFile) ? '✓ Ready' : '○ Required'}
                    </span>
                  </div>
                </div>
              </div>
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
            <h3 className="font-semibold mb-3 text-accent">💡 Interview Tips</h3>
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