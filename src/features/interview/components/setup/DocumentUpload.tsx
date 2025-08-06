import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/ui/file-upload';
import { Briefcase, FileText } from 'lucide-react';
import React from 'react';

interface DocumentUploadProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeError: string;
  setResumeError: (error: string) => void;
  jobDescriptionText: string;
  setJobDescriptionText: (text: string) => void;
  jobDescriptionFile: File | null;
  setJobDescriptionFile: (file: File | null) => void;
  jobDescError: string;
  setJobDescError: (error: string) => void;
  useJobDescFile: boolean;
  setUseJobDescFile: (value: boolean) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  resumeFile,
  setResumeFile,
  resumeError,
  setResumeError,
  jobDescriptionText,
  setJobDescriptionText,
  jobDescriptionFile,
  setJobDescriptionFile,
  jobDescError,
  setJobDescError,
  useJobDescFile,
  setUseJobDescFile,
}) => {
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

  return (
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
          accept={[".pdf", ".docx", ".doc"]}
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
          <Label className="text-sm font-medium">
            Job Description
          </Label>
        </div>

        {/* Toggle between text and file */}
        <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
          <button
            type="button"
            onClick={() => setUseJobDescFile(false)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              !useJobDescFile
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paste Text
          </button>
          <button
            type="button"
            onClick={() => setUseJobDescFile(true)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              useJobDescFile
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
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
            accept={[".pdf", ".docx", ".doc"]}
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
          <span className="text-sm text-muted-foreground">
            Resume uploaded:
          </span>
          <span
            className={`text-sm font-medium ${
              resumeFile ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {resumeFile ? "✓ Ready" : "○ Required"}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
          <span className="text-sm text-muted-foreground">
            Job description:
          </span>
          <span
            className={`text-sm font-medium ${
              jobDescriptionText.trim() || jobDescriptionFile
                ? "text-green-500"
                : "text-muted-foreground"
            }`}
          >
            {jobDescriptionText.trim() || jobDescriptionFile
              ? "✓ Ready"
              : "○ Required"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
