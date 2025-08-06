import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Play, Pause, Square } from 'lucide-react';

interface AudioRecorderProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  onSubmitAnswer: (answer: string) => void;
}

const AudioRecorder = ({ isRecording, onToggleRecording, onSubmitAnswer }: AudioRecorderProps) => {
  const [answer, setAnswer] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTime > 0) {
        // Simulate stopping recording
        setRecordingTime(0);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, recordingTime]);

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
      setRecordingTime(0);
    }
  };

  const simulatePlayback = () => {
    setIsPlaying(true);
    // Simulate 3-second playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Audio Recording Section */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Voice Recording</h3>
          
          {/* Recording Status */}
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-destructive animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm text-muted-foreground">
              {isRecording ? 'Recording...' : 'Ready to record'}
            </span>
            {isRecording && (
              <span className="font-mono text-sm">
                {formatRecordingTime(recordingTime)}
              </span>
            )}
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-center space-x-3">
            <Button
              onClick={onToggleRecording}
              variant={isRecording ? "destructive" : "hero"}
              size="lg"
              className="rounded-full w-16 h-16"
            >
              {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            {recordingTime > 0 && !isRecording && (
              <>
                <Button
                  onClick={simulatePlayback}
                  variant="outline"
                  size="lg"
                  disabled={isPlaying}
                  className="rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={() => setRecordingTime(0)}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
                >
                  <Square className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Click the microphone to start recording your answer. 
            You can also type your response below.
          </p>
        </div>
      </Card>

      {/* Text Answer Section */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Written Response</h3>
          
          <Textarea
            placeholder="Type your answer here... (Optional - you can record audio instead)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[120px] bg-background/50"
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {answer.length} characters
            </span>
            
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim() && recordingTime === 0}
              variant="hero"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-accent/5 border-accent/20">
        <div className="text-sm text-muted-foreground">
          <h4 className="font-medium text-accent mb-2">💡 Recording Tips:</h4>
          <ul className="space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Explain your thought process step by step</li>
            <li>• Don't worry if you need to pause and think</li>
            <li>• You can re-record if you're not satisfied</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AudioRecorder;