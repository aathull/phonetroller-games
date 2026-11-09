"use client";

import { useState, useSyncExternalStore } from "react";
import { generateRoomCode } from "@/lib/roomCode";

// One code per page load. Server renders null; the client fills it in after hydration.
let cachedCode: string | null = null;
const getCode = () => (cachedCode ??= generateRoomCode());
const subscribe = () => () => {};

export default function Home() {
  const [count, setCount] = useState(0);
  const roomCode = useSyncExternalStore(subscribe, getCode, () => null);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 font-sans">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm uppercase tracking-widest text-zinc-500">Join code</p>
        <p className="font-mono text-5xl font-bold tracking-[0.3em]">
          {roomCode ?? "····"}
        </p>
      </div>
      <p className="text-6xl font-semibold tabular-nums">{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-full bg-foreground px-6 py-3 text-background font-medium transition-opacity hover:opacity-80"
      >
        Increment
      </button>
    </main>
  );
}
