import { Card } from '@/components/ui/card';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

interface VideoPanelProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  className?: string;
}

const VideoPanel = ({ localStream, remoteStream, className }: VideoPanelProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMicMuted(!track.enabled);
      });
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsCameraOff(!track.enabled);
      });
    }
  };

  return (
    <Card className={`p-4 ${className} overflow-hidden`}>
      <div className="space-y-4">
        {/* Main Video Area for Remote Stream (AI) */}
        <div className="relative aspect-video bg-background/50 rounded-lg border border-border flex items-center justify-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
          {!remoteStream && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-primary/20 mb-2 flex items-center justify-center">
                    <span className="text-2xl font-medium text-primary">AI</span>
                </div>
                <p>Waiting for AI interviewer...</p>
             </div>
          )}

          {/* Local Stream Thumbnail */}
          <div className="absolute top-4 right-4 w-1/4 max-w-[150px] aspect-video bg-background rounded-lg border border-border overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted // Mute local video to prevent echo
              className="h-full w-full object-cover"
            />
            {isCameraOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <CameraOff className="h-6 w-6 text-muted-foreground" />
                </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant={isCameraOff ? "destructive" : "outline"}
            size="sm"
            onClick={toggleVideo}
          >
            {isCameraOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
          <Button
            variant={isMicMuted ? "destructive" : "outline"}
            size="sm"
            onClick={toggleAudio}
          >
            {isMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoPanel;