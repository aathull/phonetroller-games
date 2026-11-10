"use client";

import { useEffect, useRef } from "react";

export default function PlusOneButton({ code }: { code: string }) {
  const wsRef = useRef<WebSocket | null>(null);

  // Open one socket when the button appears, close it when it goes away.
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    wsRef.current = ws;
    return () => ws.close();
  }, []);

  function handleClick() {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "increment", code }));
    }
  }

  return (
    <button
      onClick={handleClick}
      className="h-40 w-40 rounded-full bg-foreground text-5xl font-bold text-background transition-transform active:scale-95"
    >
      +1
    </button>
  );
}
