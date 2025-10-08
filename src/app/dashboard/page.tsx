"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { KitResult } from "@/lib/types";
import { getRecipes } from "@/lib/recipes";
import SideMenu from "@/components/SideMenu";
import { useAuthContext } from "@/context/AuthContext";

/* ---------------- helpers ---------------- */
function useKitData() {
  const [items, setItems] = useState<KitResult[]>([]);

  // read kit history on client only
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kitHistory");
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  const latest = items.at(-1);
  const score = latest?.score ?? 9;

  const weekly = useMemo(() => {
    const base = [4, 5, 6, 6, 7, 8, score];
    return base.map((v, i) => ({ x: i + 1, y: v }));
  }, [score]);

  return { items, latest, weekly, score };
}

// simple, safe gauge (no external deps)
function Gauge({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(10, value));
  const pct = clamped / 10;
  const totalLen = 240; // approx path length used below
  return (
    <svg viewBox="0 0 120 90" className="w-28 h-20" role="img" aria-label={`Score gauge ${clamped} of 10`}>
      <path d="M12 74 A48 48 0 0 1 108 74" stroke="rgba(255,255,255,0.35)" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path
        d="M12 74 A48 48 0 0 1 108 74"
        stroke="white"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={totalLen}
        strokeDashoffset={totalLen - pct * totalLen}
      />
    </svg>
  );
}

/* ---------------- page ---------------- */
export default function Dashboard() {
  const { latest, weekly, score, items } = useKitData();
  const { profile } = useAuthContext();
  const firstName = (profile?.name || "there").split(" ")[0] || "there";

  // robust recipes: if getRecipes throws on client, fall back to empty
  const recipes = useMemo(() => {
    try {
      return getRecipes().slice(0, 2);
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="grid gap-5">

      {/* ---------- HEADER (buttons fixed & responsive) ---------- */}
      <header className="grid gap-3">
        {/* Row 1: greeting (left) + hamburger (right) */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white shadow">
                <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                />
            </div>
            <h1 className="font-headline text-2xl font-bold">Hi, {firstName}</h1>
            </div>

            {/* inline menu trigger */}
            <SideMenu />
        </div>

        {/* Row 2: CTAs (sit under the greeting row) */}
        <div className="flex items-center gap-2">
            <Link
            href="/shop/kit"
            aria-label="Buy a MAT kit"
            className="inline-flex items-center gap-2 h-10 rounded-lg border border-[var(--color-primary)] bg-white px-3 text-[15px] font-semibold text-[var(--color-primary)] w-full sm:w-auto"
            >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6l-1-3H2" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
            </svg>
            Buy a MAT kit
            </Link>

            <Link
            href="/kit/scan"
            aria-label="Scan new test"
            className="inline-flex items-center gap-2 h-10 rounded-lg bg-[var(--color-accent)] px-3 text-[15px] font-semibold text-white w-full sm:w-auto"
            >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7V5a1 1 0 0 1 1-1h2" />
                <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
                <path d="M4 17v2a1 1 0 0 0 1 1h2" />
                <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
                <rect x="7" y="7" width="10" height="10" rx="2" />
            </svg>
            Scan new test
            </Link>
        </div>
      </header>



      {/* ---------- HEALTH SCORE CARD ---------- */}
      <section className="rounded-xl p-4 bg-[var(--color-primary)] text-white">
        <p className="text-sm/5 opacity-90 mb-2">Your Health Score</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Gauge value={score} />

          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-lg opacity-90">/10</span>
              <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">Great</span>
            </div>
            {latest && (
              <p className="mt-1 text-sm opacity-90">Your score has improved by 1 point. Keep it up!</p>
            )}
          </div>

          <Link href="/kit/result" className="text-sm underline underline-offset-2 decoration-white/60">
            View last result
          </Link>
        </div>
      </section>

      {/* ---------- WEEKLY PROGRESS ---------- */}
      <section className="rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-700 mb-2">Weekly Progress</p>
        <div className="relative h-28 w-full">
          <svg viewBox="0 0 320 120" className="absolute inset-0 h-full w-full" role="img" aria-label="Weekly score trend">
            {[0, 25, 50, 75, 100].map((y) => (
              <line key={y} x1="8" x2="312" y1={110 - y} y2={110 - y} stroke="#E5E7EB" strokeWidth="1" />
            ))}
            <polyline
              fill="none"
              stroke="currentColor"
              className="text-[var(--color-accent)]"
              strokeWidth="3"
              points={weekly.map((p, i) => `${(i / (weekly.length - 1)) * 300 + 12},${110 - (p.y / 10) * 100}`).join(" ")}
            />
            {weekly.map((p, i) => (
              <circle
                key={i}
                cx={(i / (weekly.length - 1)) * 300 + 12}
                cy={110 - (p.y / 10) * 100}
                r="3.5"
                fill="currentColor"
                className="text-[var(--color-accent)]"
              />
            ))}
          </svg>
        </div>
      </section>

      {/* ---------- NUTRITION TIPS / RECIPES ---------- */}
      <section className="grid grid-cols-2 gap-3">
        {recipes.map((r, i) => {
            const tag = i === 0 ? "Recipe" : "Add"; // derive badge for demo
            const tagCls =
                tag === "Recipe"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200";

            return (
                <Link
                key={r.id}
                href={`/recipes/${r.id}`}
                className="group overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md"
                >
                <img src={r.hero} alt={r.title} className="h-28 w-full object-cover" />
                <div className="p-3">
                    <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-medium">{r.title}</h3>
                    <span className={`rounded px-2 py-0.5 text-xs ${tagCls}`}>{tag}</span>
                    </div>
                    <p className="line-clamp-2 text-xs text-gray-600">{r.summary}</p>
                    <span className="mt-2 inline-block text-xs text-[var(--color-primary)]">
                    View details →
                    </span>
                </div>
                </Link>
            );
            })}

        {recipes.length === 0 && (
          <div className="col-span-2 text-sm text-gray-500">Recipes unavailable in demo.</div>
        )}
      </section>

      {/* ---------- NOTES ---------- */}
      <section className="rounded-xl border bg-white">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notes</h3>
          <Link href="/kit/note" className="text-sm text-[var(--color-primary)]">+ Add a note</Link>
        </div>
        <div className="grid gap-3 px-4 pb-4">
          {[...items].reverse().slice(0, 3).map((k) => (
            <div key={k.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{new Date(k.date).toLocaleDateString()}</span>
                <span className="text-xs text-gray-500">Score {k.score}/10</span>
              </div>
              {k.note && <p className="mt-1 text-sm text-gray-700">{k.note}</p>}
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-gray-500">No notes yet.</p>}
        </div>
      </section>
    </div>
  );
}
