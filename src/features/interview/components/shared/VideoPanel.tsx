import { Card } from '@/components/ui/card';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface VideoPanelProps {
  className?: string;
}

const VideoPanel = ({ className }: VideoPanelProps) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        {/* Main Video Area */}
        <div className="relative aspect-video bg-background/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          {isCameraOn ? (
            <div className="text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Your camera feed</p>
            </div>
          ) : (
            <div className="text-center">
              <CameraOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Camera off</p>
            </div>
          )}
          
          {/* AI Interviewer Thumbnail */}
          <div className="absolute top-4 right-4 w-20 h-15 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">AI</span>
              </div>
              <p className="text-xs text-muted-foreground">Interviewer</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant={isCameraOn ? "outline" : "destructive"}
            size="sm"
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
          </Button>
          <Button
            variant={isMicOn ? "outline" : "destructive"}
            size="sm"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoPanel;