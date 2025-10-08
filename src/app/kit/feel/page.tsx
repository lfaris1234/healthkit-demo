"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { KitResult } from "@/lib/types";

const OPTIONS = ["Happy","Neutral","Disappointed","Surprised","Don’t believe it","Want to repeat"];

export default function FeelPage() {
  const router = useRouter();
  const [latestIdx, setLatestIdx] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("kitHistory");
    const arr: KitResult[] = raw ? JSON.parse(raw) : [];
    setLatestIdx(arr.length - 1);
  }, []);

  const setFeeling = (value: string) => {
    const raw = localStorage.getItem("kitHistory");
    const arr: KitResult[] = raw ? JSON.parse(raw) : [];
    if (latestIdx == null || latestIdx < 0) return router.push("/dashboard");
    arr[latestIdx].feeling = value;
    localStorage.setItem("kitHistory", JSON.stringify(arr));
    router.push("/kit/note");
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">How do you feel about your score?</h1>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map(o=>(
          <button
            key={o}
            onClick={()=>setFeeling(o)}
            className="h-11 rounded-md border hover:border-[var(--color-primary)]"
          >
            {o}
          </button>
        ))}
      </div>
      <button
        onClick={()=>router.push("/kit/note")}
        className="mt-2 rounded-md bg-[var(--color-primary)] px-4 py-2 text-white"
      >
        Continue
      </button>
      <button onClick={()=>router.push("/dashboard")} className="text-sm text-[var(--color-primary)] underline">
        Skip for now
      </button>
    </div>
  );
}
