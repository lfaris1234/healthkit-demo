"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type State = {
  gender: string;
  dietary: string[];
  notes: string;
};

const DIETS = ["Vegan", "Vegetarian", "Paleo", "Keto", "Gluten-free", "Dairy-free"];

export default function QuestionsForm() {
  const router = useRouter();
  const [state, setState] = useState<State>({ gender: "", dietary: [], notes: "" });

  const toggleDiet = (d: string) =>
    setState((s) => {
      const exists = s.dietary.includes(d);
      return { ...s, dietary: exists ? s.dietary.filter((x) => x !== d) : [...s.dietary, d] };
    });

  const next = () => {
    // For demo, pretend to persist to localStorage
    localStorage.setItem("onboarding", JSON.stringify(state));
    router.push("/dashboard");
  };

  return (
    <form
      className="rounded-xl border p-4 sm:p-6 grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Gender (optional)</legend>
        <div className="flex gap-3 flex-wrap">
          {["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={state.gender === g}
                onChange={() => setState((s) => ({ ...s, gender: g }))}
              />
              {g}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Dietary preferences (optional)</legend>
        <div className="flex gap-3 flex-wrap">
          {DIETS.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.dietary.includes(d)}
                onChange={() => toggleDiet(d)}
              />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1">
        <span className="text-sm font-medium">Notes (allergies, restrictions)</span>
        <textarea
          className="min-h-24 rounded border p-2"
          value={state.notes}
          onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          placeholder="e.g., sesame allergy, prefer low-sodium recipes…"
        />
      </label>

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-md border px-4 py-2 text-[var(--color-primary)] border-[var(--color-primary)]"
        >
          Skip for now
        </button>
        <button
          type="submit"
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
