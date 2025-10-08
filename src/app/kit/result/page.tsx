"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KitResult } from "@/lib/types";
import { getRecipes } from "@/lib/recipes";

/* ---- read latest + delta safely on client ---- */
function useLatestResult() {
  const [latest, setLatest] = useState<KitResult | null>(null);
  const [delta, setDelta] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kitHistory");
      const arr: KitResult[] = raw ? JSON.parse(raw) : [];
      setLatest(arr.at(-1) ?? null);
      const prev = arr.length >= 2 ? arr[arr.length - 2] : null;
      setDelta(prev ? (arr.at(-1)!.score - prev.score) : 1); // default +1 for demo
    } catch {
      setLatest(null);
      setDelta(1);
    }
  }, []);

  return { latest, delta };
}

/* ---- simple big gauge for the hero ---- */
function GaugeHero({ value }: { value: number }) {
  const v = Math.max(0, Math.min(10, value));
  const pct = v / 10;
  const total = 240; // approximate path length

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 110" className="w-40 h-28">
        {/* background arc */}
        <path
          d="M20 90 A60 60 0 0 1 140 90"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* active arc (green) */}
        <path
          d="M20 90 A60 60 0 0 1 140 90"
          stroke="#34D399" /* emerald-400 */
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={total}
          strokeDashoffset={total - pct * total}
        />
        {/* knob */}
        {/* compute angle for the knob roughly from -120 to 120 deg */}
        {(() => {
          const angle = (-120 + pct * 240) * (Math.PI / 180);
          const cx = 80, cy = 90, r = 60;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return <circle cx={x} cy={y} r="5" fill="#34D399" stroke="white" strokeWidth="2" />;
        })()}
      </svg>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-5xl font-bold">{v}</span>
        <span className="text-2xl opacity-90">/10</span>
      </div>
    </div>
  );
}

export default function KitResultPage() {
  const { latest, delta } = useLatestResult();
  const score = latest?.score ?? 9;

  const message =
    delta > 0
      ? `Your score has improved by ${delta} point${delta === 1 ? "" : "s"}.`
      : delta < 0
      ? `Your score decreased by ${Math.abs(delta)} point${Math.abs(delta) === 1 ? "" : "s"}.`
      : "Your score is unchanged.";

  const recipes = useMemo(() => {
    try {
      return getRecipes().slice(0, 2);
    } catch {
      return [
        { id: "r1", title: "Lentil Soup", hero: "/images/recipe1.jpg", summary: "" },
        { id: "r2", title: "Chia Seeds", hero: "/images/recipe2.jpg", summary: "" },
      ] as any[];
    }
  }, []);

  return (
    <div className="grid gap-5">
      {/* Blue result card */}
      <section className="rounded-2xl bg-[var(--color-primary)] text-white p-5 md:p-6">
        <h2 className="font-headline text-xl font-bold text-center">Your Health Score</h2>

        <div className="mt-1 flex flex-col items-center">
          <GaugeHero value={score} />
          <p className="mt-1 text-sm opacity-90 text-center">{message} <br />Keep it up!</p>
        </div>

        {/* two recommendation cards inside the blue area */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {recipes.map((r, i) => {
            const tag = i === 0 ? "Recipe" : "Add";
            return (
              <article key={r.id} className="overflow-hidden rounded-xl bg-white text-slate-900">
                <div className="relative">
                  <img src={r.hero} alt={r.title} className="h-24 w-full object-cover" />
                  <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-medium
                    ${tag === "Recipe" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                    {tag}
                  </span>
                </div>
                <div className="px-3 py-2">
                  <h3 className="text-sm font-semibold line-clamp-1">{r.title}</h3>
                  {/* optional summary could go here */}
                </div>
              </article>
            );
          })}
        </div>

        {/* Continue CTA (teal, full width) */}
        <Link
          href="/kit/feel"
          className="mt-5 block h-12 w-full rounded-lg bg-[var(--color-accent)] text-center text-white text-[15px] font-semibold grid place-items-center"
        >
          Continue
        </Link>
      </section>
    </div>
  );
}
