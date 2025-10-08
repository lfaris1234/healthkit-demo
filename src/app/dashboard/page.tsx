"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KitResult, FeedItem } from "@/lib/types";
import { getRecipes } from "@/lib/recipes";
import SideMenu from "@/components/SideMenu"; 

function useKitData() {
  const [items, setItems] = useState<KitResult[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("kitHistory");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);
  const latest = items.at(-1);
  const score = latest?.score ?? 9;
  const weekly = useMemo(() => {
    const base = [4, 5, 6, 6, 7, 8, score];
    return base.map((v, i) => ({ x: i + 1, y: v }));
  }, [score]);
  return { items, latest, weekly, score };
}

const FEED: FeedItem[] = [
  { id: "r1", title: "Lentil Soup", tag: "Recipe", body: "Fiber-rich. Great for gut health.", image: "/images/recipe1.jpg" },
  { id: "r2", title: "Chia Seeds", tag: "Add", body: "Omega-3 and soluble fiber.", image: "/images/recipe2.jpg" },
];

export default function Dashboard() {
  const { latest, weekly, score, items } = useKitData();

  return (
    <div className="grid gap-4">
      <SideMenu />

      {/* ---- Health score ---- */}
      <section className="rounded-xl border p-4 mt-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Your Health Score</p>
          {latest && (
            <span className="text-xs text-emerald-700">
              Your score has improved by 1 point. Keep it up!
            </span>
          )}
        </div>
        <div className="mt-2 flex items-end gap-4">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-lg font-semibold text-white">
              {score}
            </div>
            <span>/10</span>
          </div>
          <Link href="/kit/result" className="text-sm text-[var(--color-primary)] underline">
            View last result
          </Link>
        </div>
      </section>

      {/* ---- Weekly progress ---- */}
      <section className="rounded-xl border p-4">
        <p className="text-sm text-gray-600">Weekly Progress</p>
        <svg viewBox="0 0 320 120" className="mt-2 h-28 w-full">
          <polyline
            fill="none"
            stroke="currentColor"
            className="text-[var(--color-primary)]"
            strokeWidth="3"
            points={weekly
              .map((p, i) => `${(i / (weekly.length - 1)) * 300 + 10},${110 - (p.y / 10) * 100}`)
              .join(" ")}
          />
          {weekly.map((p, i) => (
            <circle
              key={i}
              cx={(i / (weekly.length - 1)) * 300 + 10}
              cy={110 - (p.y / 10) * 100}
              r="3"
              fill="currentColor"
              className="text-[var(--color-primary)]"
            />
          ))}
        </svg>
      </section>

      {/* ---- Nutrition tips / recipes ---- */}
      <section className="grid grid-cols-2 gap-3">
        {getRecipes().slice(0, 2).map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className="group overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md"
          >
            <img src={r.hero} alt={r.title} className="h-28 w-full object-cover" />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{r.title}</h3>
                <span className="rounded bg-muted px-2 py-0.5 text-xs">Recipe</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-gray-600">{r.summary}</p>
              <span className="mt-2 inline-block text-xs text-[var(--color-primary)]">
                View details →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ---- Notes ---- */}
      <section className="rounded-xl border">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notes</h3>
          <Link href="/kit/note" className="text-sm text-[var(--color-primary)]">
            + Add a note
          </Link>
        </div>
        <div className="grid gap-3 px-4 pb-4">
          {[...items].reverse().slice(0, 3).map((k) => (
            <div key={k.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {new Date(k.date).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">Score {k.score}/10</span>
              </div>
              {k.note && <p className="mt-1 text-sm text-gray-700">{k.note}</p>}
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-500">No notes yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
