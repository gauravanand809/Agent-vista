import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '@/contexts/InterviewContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FileUpload from '@/components/ui/file-upload';
import { topics, difficulties } from '@/data/mockData';
import { ArrowLeft, Play, Clock, Target, Brain, FileText, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterviewSetup = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>('');
  const [jobDescError, setJobDescError] = useState<string>('');
  const { startInterview } = useInterview();
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (!selectedTopic || !resumeFile || !jobDescriptionFile) return;
    
    startInterview(selectedTopic, selectedDifficulty, resumeFile, jobDescriptionFile);
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

  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return {
          description: 'Perfect for beginners or refreshing basics',
          time: '3 minutes per question',
          color: 'text-success'
        };
      case 'medium':
        return {
          description: 'Great for intermediate developers',
          time: '4 minutes per question',
          color: 'text-warning'
        };
      case 'hard':
        return {
          description: 'Challenge yourself with advanced concepts',
          time: '5 minutes per question',
          color: 'text-destructive'
        };
      default:
        return { description: '', time: '', color: '' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Setup Your Interview</h1>
            <p className="text-muted-foreground">
              Choose your topic and difficulty level to get started
            </p>
          </div>
        </div>

        {/* Setup Form */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="space-y-8">
            {/* Topic Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Topic</Label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-full h-12 text-lg">
                  <SelectValue placeholder="Choose a programming topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic} className="text-lg py-3">
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Choose Difficulty</Label>
              <RadioGroup 
                value={selectedDifficulty} 
                onValueChange={(value) => setSelectedDifficulty(value as 'easy' | 'medium' | 'hard')}
                className="space-y-3"
              >
                {difficulties.map((difficulty) => {
                  const info = getDifficultyInfo(difficulty);
                  return (
                    <div key={difficulty} className="flex items-center space-x-3">
                      <RadioGroupItem value={difficulty} id={difficulty} />
                      <Label 
                        htmlFor={difficulty} 
                        className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold capitalize ${info.color}`}>
                                {difficulty}
                              </span>
                              <Target className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {info.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{info.time}</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">Upload Your Resume</Label>
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

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">Upload Job Description</Label>
                </div>
                <FileUpload
                  label=""
                  accept={['.pdf', '.docx', '.doc']}
                  maxSize={5 * 1024 * 1024} // 5MB
                  onFileSelect={handleJobDescSelect}
                  selectedFile={jobDescriptionFile}
                  error={jobDescError}
                />
              </div>
            </div>

            {/* Interview Info */}
            {selectedTopic && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-primary" />
                  Interview Details
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Topic:</span>
                    <span className="font-medium text-foreground">{selectedTopic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className={`font-medium capitalize ${getDifficultyInfo(selectedDifficulty).color}`}>
                      {selectedDifficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium text-foreground">5 questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span className="font-medium text-foreground">15-25 minutes</span>
                  </div>
                  {resumeFile && (
                    <div className="flex justify-between">
                      <span>Resume:</span>
                      <span className="font-medium text-foreground">{resumeFile.name}</span>
                    </div>
                  )}
                  {jobDescriptionFile && (
                    <div className="flex justify-between">
                      <span>Job Description:</span>
                      <span className="font-medium text-foreground">{jobDescriptionFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Start Button */}
            <Button
              onClick={handleStartInterview}
              disabled={!selectedTopic || !resumeFile || !jobDescriptionFile}
              variant="hero"
              size="xl"
              className="w-full"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Interview
            </Button>
          </div>
        </Card>

        {/* Tips */}
        <Card className="mt-6 p-6 bg-accent/5 border-accent/20">
          <h3 className="font-semibold mb-3 text-accent">💡 Interview Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Upload your current resume and the job description for personalized questions</li>
            <li>• Find a quiet environment for optimal voice recording</li>
            <li>• Think out loud to demonstrate your problem-solving process</li>
            <li>• Take your time to understand each question fully</li>
            <li>• Don't worry about perfect answers - focus on clear communication</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default InterviewSetup;