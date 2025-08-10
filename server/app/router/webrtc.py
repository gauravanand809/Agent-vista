from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List

router = APIRouter(
    prefix="/ws",
    tags=["websockets"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        if session_id not in self.active_connections:
            self.active_connections[session_id] = []
        self.active_connections[session_id].append(websocket)

    def disconnect(self, websocket: WebSocket, session_id: str):
        if session_id in self.active_connections:
            self.active_connections[session_id].remove(websocket)
            if not self.active_connections[session_id]:
                del self.active_connections[session_id]

    async def broadcast_to_session(self, message: str, websocket: WebSocket, session_id: str):
        if session_id in self.active_connections:
            for connection in self.active_connections[session_id]:
                if connection != websocket:
                    await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/webrtc/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    try:
        while True:
            data = await websocket.receive_text()
            # The received data is a signaling message (offer, answer, ice candidate)
            # We just need to broadcast it to the other peer in the session.
            await manager.broadcast_to_session(data, websocket, session_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket, session_id)
        # Optionally, notify the other peer about the disconnection
        await manager.broadcast_to_session("Peer disconnected", websocket, session_id)
    except Exception as e:
        print(f"Error in websocket endpoint: {e}")
        manager.disconnect(websocket, session_id)
