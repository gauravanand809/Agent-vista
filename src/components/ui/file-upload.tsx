import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label: string;
  accept: string[];
  maxSize: number; // in bytes
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  maxSize,
  onFileSelect,
  selectedFile,
  error,
  className
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = accept.map(ext => ext.replace('.', '').toLowerCase());
    
    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
      return `Please upload a ${accept.join(' or ')} file`;
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  }, [accept, maxSize]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragActive(false);
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const validationError = validateFile(file);
      
      if (validationError) {
        // Handle error - for now just don't select the file
        return;
      }
      
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  const removeFile = () => {
    onFileSelect(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      
      {!selectedFile ? (
        <Card
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer transition-all duration-200 hover:border-primary/50",
            "border-2 border-dashed p-6 text-center",
            (isDragActive || dropzoneActive) && "border-primary bg-primary/5",
            error && "border-destructive"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-3">
            <div className={cn(
              "rounded-full p-3 transition-colors",
              (isDragActive || dropzoneActive) ? "bg-primary/10" : "bg-muted"
            )}>
              <Upload className={cn(
                "h-6 w-6 transition-colors",
                (isDragActive || dropzoneActive) ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive || dropzoneActive 
                  ? "Drop your file here" 
                  : "Drag & drop your file here"
                }
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files
              </p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Supported: {accept.join(', ')}</p>
              <p>Max size: {Math.round(maxSize / (1024 * 1024))}MB</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <File className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
      
      {error && (
        <div className="flex items-center space-x-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;