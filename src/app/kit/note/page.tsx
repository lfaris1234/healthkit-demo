"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { KitResult } from "@/lib/types";

export default function AddNotePage() {
  const router = useRouter();
  const [items, setItems] = useState<KitResult[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("kitHistory");
    const arr: KitResult[] = raw ? JSON.parse(raw) : [];
    setItems(arr);
    setSelected(arr.at(-1)?.id ?? "");
  }, []);

  const save = () => {
    const arr = [...items];
    const idx = arr.findIndex(i=>i.id===selected);
    if (idx >= 0) {
      arr[idx].note = note.trim();
      localStorage.setItem("kitHistory", JSON.stringify(arr));
    }
    router.push("/dashboard");
  };

  const label = useMemo(()=>{
    const hit = items.find(i=>i.id===selected);
    return hit ? new Date(hit.date).toLocaleDateString() + " · Test Kit" : "Select a kit";
  }, [items, selected]);

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Add a test kit note</h1>

      <label className="grid gap-1">
        <span className="text-sm text-gray-700">Select kit *</span>
        <select
          value={selected}
          onChange={(e)=>setSelected(e.target.value)}
          className="h-10 w-full rounded-md border px-2 text-sm"
        >
          {items.length===0 && <option value="">No kits yet</option>}
          {items.map(i=>(
            <option key={i.id} value={i.id}>
              {new Date(i.date).toLocaleDateString()} · Test Kit · Score {i.score}/10
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-gray-700">Note</span>
        <textarea
          className="min-h-28 rounded-md border p-2 text-sm"
          placeholder="Type your note here"
          value={note}
          onChange={(e)=>setNote(e.target.value)}
        />
      </label>

      <div className="flex justify-between">
        <button onClick={()=>router.push("/dashboard")} className="text-sm text-[var(--color-primary)] underline">
          Skip for now
        </button>
        <button onClick={save} className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white">
          Save note
        </button>
      </div>
    </div>
  );
}
