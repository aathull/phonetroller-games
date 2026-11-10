import { WebSocketServer, WebSocket } from "ws";

const PORT = 4000;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket) => {
  console.log(`Client connected (${wss.clients.size} total)`);

  socket.on("message", (raw) => {
    let data: { type?: string; code?: string };
    try {
      data = JSON.parse(raw.toString());
    } catch {
      console.warn("Ignored non-JSON message:", raw.toString());
      return;
    }

    if (data.type === "increment") {
      console.log(`+1 in room ${data.code}`);
      // Send to every other client. Each host ignores messages for other rooms.
      for (const client of wss.clients) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      }
    }
  });

  socket.on("close", () => {
    console.log(`Client disconnected (${wss.clients.size} total)`);
  });
});

console.log(`WebSocket server listening on ws://localhost:${PORT}`);
