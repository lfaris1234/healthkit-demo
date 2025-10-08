"use client";

import { useEffect, useState } from "react";
import SideMenu from "@/components/SideMenu";
import type { Profile } from "@/lib/types";
import ProfileForm from "./components/ProfileForm";
import ProfileSummary from "./components/ProfileSummary";

function countMissing(p: Profile | null): number {
  if (!p) return 8;
  const keys: (keyof Profile)[] = [
    "age","gender","eatsAnimalProtein","dietary","medical","medication","supplements","goals",
  ];
  return keys.reduce((acc, k) => (p[k] ? acc : acc + 1), 0);
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(true); // default to form on first visit

  // load existing profile
  useEffect(() => {
    const raw = localStorage.getItem("profile");
    const p: Profile | null = raw ? JSON.parse(raw) : null;
    setProfile(p);
    if (p) setEditing(false); // if we already have something, show summary first
  }, []);

  const handleSaved = (p: Profile) => {
    setProfile(p);
    setEditing(false); // ALWAYS show summary after saving (even if incomplete)
  };

  const missing = countMissing(profile);

  return (
    <div className="grid gap-4">
      <SideMenu title={profile?.name || "Kelly Walters"} />

      <div className="rounded-xl border p-4">
        {editing ? (
          <ProfileForm onSaved={handleSaved} />
        ) : profile ? (
          <>
            {/* tiny inline status above summary */}
            {missing > 0 && (
              <p className="mb-2 text-sm text-amber-700">
                Profile incomplete — {missing} field{missing > 1 ? "s" : ""} missing.
              </p>
            )}
            <ProfileSummary
              profile={profile}
              onEdit={() => setEditing(true)}
            />
          </>
        ) : (
          <ProfileForm onSaved={handleSaved} />
        )}
      </div>
    </div>
  );
}
