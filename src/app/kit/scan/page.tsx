"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ScanPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onFile = (f: File) => {
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const submitScan = async () => {
    // pretend to analyze image → create a result and store it
    const score = 9; // demo value
    const item = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      score,
      imageUrl: preview || "/images/strip.jpg",
    };
    const raw = localStorage.getItem("kitHistory");
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(item);
    localStorage.setItem("kitHistory", JSON.stringify(arr));
    router.push("/kit/result");
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Scan the strip</h1>

      <div className="rounded-xl border overflow-hidden">
        <img
          src={preview || "/images/strip.jpg"}
          alt="placeholder for demo"
          className="h-72 w-full object-cover"
        />
        <div className="flex items-center justify-between p-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Upload image
          </button>
          <button
            onClick={submitScan}
            className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm text-white"
          >
            Save + Continue
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}
