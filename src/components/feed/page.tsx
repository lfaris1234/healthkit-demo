"use client";

import { useMemo, useState } from "react";
import SideMenu from "@/components/SideMenu";
import FeedCard from "@/components/feed/FeedCard";

const FEED = [
  {
    id: "f1",
    title: "Lentil Soup",
    tag: "Recipe",
    body: "Lentils are rich in fiber, both soluble and insoluble. A great choice for quick soups.",
    image: "/images/recipe1.jpg",
  },
  {
    id: "f2",
    title: "Chia Pudding",
    tag: "Recipe",
    body: "Chia seeds provide omega-3s and soluble fiber that support digestion.",
    image: "/images/recipe2.jpg",
  },
  {
    id: "f3",
    title: "Fiber 101",
    tag: "Guide",
    body: "How much fiber do you need? Most adults should aim for 25–38g/day.",
    image: "/images/guide1.jpg",
  },
];

export default function FeedPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return FEED;
    return FEED.filter(
      (i) =>
        i.title.toLowerCase().includes(t) ||
        i.body.toLowerCase().includes(t) ||
        (i.tag ?? "").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="grid gap-4">
      <SideMenu />

      {/* search bar */}
      <label className="mt-2 flex items-center gap-2 rounded-xl border px-3 py-2">
        <span>🔎</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="w-full outline-none"
        />
        {q && (
          <button className="text-sm text-gray-500" onClick={() => setQ("")}>
            Clear
          </button>
        )}
      </label>

      <h2 className="text-base font-medium">Your Nutrition Feed</h2>

      <div className="grid gap-3">
        {filtered.map((f) => (
          <FeedCard key={f.id} {...f} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No results. Try “fiber”, “chia”, or “recipe”.</p>
        )}
      </div>

      <div className="mt-1 flex justify-end">
        <a
          href="/chat"
          className="rounded-full border px-3 py-1.5 text-sm text-[var(--color-primary)]"
        >
          Open chat →
        </a>
      </div>
    </div>
  );
}
