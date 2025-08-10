import { useState, useEffect, useRef } from 'react';

const PC_CONFIG = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8000/ws';

export const useWebRTC = (sessionId: string | null) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    ws.current = new WebSocket(`${WEBSOCKET_URL}/webrtc/${sessionId}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      if (!peerConnection.current) {
        console.error('PeerConnection not initialized');
        return;
      }

      if (message.offer) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        ws.current?.send(JSON.stringify({ answer: peerConnection.current.localDescription }));
      } else if (message.answer) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.answer));
      } else if (message.candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on unmount
    return () => {
      ws.current?.close();
      peerConnection.current?.close();
    };
  }, [sessionId]);

  const initializePeerConnection = (stream: MediaStream) => {
    peerConnection.current = new RTCPeerConnection(PC_CONFIG);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current?.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    stream.getTracks().forEach(track => {
      peerConnection.current?.addTrack(track, stream);
    });
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      initializePeerConnection(stream);

      if (peerConnection.current) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        ws.current?.send(JSON.stringify({ offer: peerConnection.current.localDescription }));
      }
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  return { localStream, remoteStream, startCall };
};
