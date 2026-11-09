import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isValidRoomCode } from "@/lib/roomCode";

// With cacheComponents enabled, route params are runtime data and must be read inside <Suspense>.
export default function PartyPage({ params }: PageProps<"/joinparty/[code]">) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 font-sans">
      <Suspense fallback={<p className="text-zinc-500">Joining…</p>}>
        {params.then(({ code }) => (
          <PartyInfo code={code} />
        ))}
      </Suspense>
    </main>
  );
}

function PartyInfo({ code }: { code: string }) {
  const upper = code.toUpperCase();
  if (!isValidRoomCode(upper)) notFound();

  return (
    <>
      <p className="text-sm uppercase tracking-widest text-zinc-500">Party</p>
      <p className="font-mono text-5xl font-bold tracking-[0.3em]">{upper}</p>
      <p className="text-zinc-500">Joined! (Not connected to the host yet.)</p>
    </>
  );
}
