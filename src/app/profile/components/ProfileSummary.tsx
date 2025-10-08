"use client";

import type { Profile } from "@/lib/types";

export default function ProfileSummary({
  profile,
  onEdit,
}: {
  profile: Profile;
  onEdit: () => void;
}) {
  const p = profile;

  const Row = ({ k, v }: { k: string; v?: string }) => (
    <div className="grid grid-cols-[120px,1fr] gap-3 text-sm">
      <div className="text-gray-500">{k}</div>
      <div className="text-[var(--color-primary)]">{v || "—"}</div>
    </div>
  );

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">{p.name || "Kelly Walters"}</h2>
      <Row k="Age" v={p.age} />
      <Row k="Gender" v={p.gender} />
      <Row k="Animal protein" v={p.eatsAnimalProtein} />
      <Row k="Dietary restrictions and allergens" v={p.dietary} />
      <Row k="Medical Conditions" v={p.medical} />
      <Row k="Medication" v={p.medication} />
      <Row k="Supplements" v={p.supplements} />
      <Row k="Health goals" v={p.goals} />

      <button
        onClick={onEdit}
        className="mt-2 h-11 rounded-md border border-[var(--color-primary)] px-4 text-[var(--color-primary)]"
      >
        Edit profile
      </button>
    </div>
  );
}
