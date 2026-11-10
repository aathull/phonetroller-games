"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidRoomCode, normalizeRoomCode, ROOM_CODE_LENGTH } from "@/lib/roomCode";

export default function JoinPartyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const ready = isValidRoomCode(code);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ready) router.push(`/joinparty/${code}`);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 font-sans">
      <h1 className="text-3xl font-semibold">Join Party</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-4">
        <input
          value={code}
          onChange={(e) => setCode(normalizeRoomCode(e.target.value))}
          maxLength={ROOM_CODE_LENGTH}
          placeholder="ABCD"
          aria-label="Party code"
          autoFocus
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="rounded-xl border border-zinc-300 bg-transparent py-4 text-center font-mono text-4xl font-bold tracking-[0.3em] uppercase outline-none focus:border-foreground dark:border-zinc-700"
        />
        <button
          type="submit"
          disabled={!ready}
          className="rounded-full bg-foreground py-3 text-lg font-medium text-background transition-opacity disabled:opacity-30"
        >
          Join
        </button>
      </form>
    </main>
  );
}
