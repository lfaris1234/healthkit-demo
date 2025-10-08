"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { KitResult } from "@/lib/types";

export default function KitResultPage() {
  const [latest, setLatest] = useState<KitResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("kitHistory");
    const arr: KitResult[] = raw ? JSON.parse(raw) : [];
    setLatest(arr.at(-1) ?? null);
  }, []);

  const score = latest?.score ?? 9;

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl bg-[#0C3B66] text-white p-6">
        <p className="text-sm/none opacity-80">Your Health Score</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="h-16 w-16 grid place-items-center rounded-full bg-white/10 text-3xl font-bold">
            {score}
          </div>
          <div className="text-xs">
            <p>Your score has improved by 1 point.</p>
            <p>Keep it up!</p>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/kit/feel" className="inline-block rounded-md bg-white/10 px-4 py-2">
            Continue
          </Link>
        </div>
      </div>

      {/* tiny feed preview to match mock */}
      <div className="grid grid-cols-2 gap-3">
        <article className="rounded-xl overflow-hidden bg-white">
          <img src="/images/recipe1.jpg" className="h-24 w-full object-cover" alt="" />
          <div className="p-3 text-xs text-white bg-[var(--color-primary)]/90">Recipe</div>
        </article>
        <article className="rounded-xl overflow-hidden bg-white">
          <img src="/images/recipe2.jpg" className="h-24 w-full object-cover" alt="" />
          <div className="p-3 text-xs text-white bg-[var(--color-primary)]/90">Add</div>
        </article>
      </div>
    </div>
  );
}
