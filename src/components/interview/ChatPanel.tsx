import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';

interface ChatMessage {
  id: string;
  speaker: 'ai' | 'user';
  message: string;
  timestamp: Date;
}

interface ChatPanelProps {
  className?: string;
}

const mockTranscriptions: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  { speaker: 'ai', message: 'Welcome to your interview! Let\'s begin with the first question.' },
  { speaker: 'user', message: 'Thank you, I\'m ready to start.' },
  { speaker: 'ai', message: 'Great! Please explain the difference between let, const, and var in JavaScript.' },
  { speaker: 'user', message: 'Well, let and const are block-scoped while var is function-scoped...' },
  { speaker: 'ai', message: 'Excellent explanation! Can you give me an example?' },
];

const ChatPanel = ({ className }: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Simulate live transcription by adding messages over time
    const timer = setInterval(() => {
      setMessages(prev => {
        if (prev.length < mockTranscriptions.length) {
          const nextMessage = mockTranscriptions[prev.length];
          return [...prev, {
            ...nextMessage,
            id: `msg-${prev.length}`,
            timestamp: new Date()
          }];
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Live Transcription</h3>
        
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.speaker === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-secondary text-secondary-foreground mr-4'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium">
                      {message.speaker === 'ai' ? 'AI Interviewer' : 'You'}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            <span>Live transcription active</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatPanel;