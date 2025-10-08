"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/lib/types";

export default function ProfileForm({ onSaved }: { onSaved: (p: Profile) => void }) {
  const [p, setP] = useState<Profile>({
    age: "", gender: "", eatsAnimalProtein: "", dietary: "", medical: "",
    medication: "", supplements: "", goals: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem("profile");
    if (raw) setP(JSON.parse(raw));
  }, []);

  const save = () => {
    localStorage.setItem("profile", JSON.stringify(p));
    onSaved(p); // tell parent to show summary (even if incomplete)
  };

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP(s => ({ ...s, [k]: v }));

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => { e.preventDefault(); save(); }}
    >
      <p className="text-sm text-gray-600">Complete your nutrition profile</p>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Gender</label>
        <div className="grid grid-cols-2 gap-2">
          <button type="button"
            onClick={() => set("gender","Male")}
            className={`h-10 rounded-md border ${p.gender==="Male" ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10" : ""}`}
          >Male</button>
          <button type="button"
            onClick={() => set("gender","Female")}
            className={`h-10 rounded-md border ${p.gender==="Female" ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10" : ""}`}
          >Female</button>
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Do you eat animal protein?</label>
        <p className="text-xs text-gray-500">including meat, fish, seafood, dairy, and eggs.</p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button"
            onClick={() => set("eatsAnimalProtein","Yes")}
            className={`h-10 rounded-md border ${p.eatsAnimalProtein==="Yes" ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10" : ""}`}
          >Yes</button>
          <button type="button"
            onClick={() => set("eatsAnimalProtein","No")}
            className={`h-10 rounded-md border ${p.eatsAnimalProtein==="No" ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10" : ""}`}
          >No</button>
        </div>
      </div>

      <LabeledInput label="Age" value={p.age ?? ""} onChange={(v)=>set("age", v)} placeholder="29" type="number" />
      <LabeledInput label="Dietary restrictions and allergens" value={p.dietary ?? ""} onChange={(v)=>set("dietary", v)} placeholder="Chicken, eggs, nuts" />
      <LabeledInput label="Medical Conditions" value={p.medical ?? ""} onChange={(v)=>set("medical", v)} placeholder="Hypoglycemia" />
      <LabeledInput label="Medication" value={p.medication ?? ""} onChange={(v)=>set("medication", v)} placeholder="Glucagon" />
      <LabeledInput label="Supplements" value={p.supplements ?? ""} onChange={(v)=>set("supplements", v)} placeholder="Kirkland Multivitamins" />
      <LabeledInput label="Health goals" value={p.goals ?? ""} onChange={(v)=>set("goals", v)} placeholder="Improve overall health" />

      <button type="submit" className="mt-2 h-11 rounded-md bg-[var(--color-primary)] px-4 text-white">
        Save profile
      </button>
    </form>
  );
}

function LabeledInput({
  label, value, onChange, placeholder, type="text",
}: {
  label: string; value: string; onChange: (v: string)=>void; placeholder?: string; type?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-[var(--color-primary)]"
      />
    </label>
  );
}
