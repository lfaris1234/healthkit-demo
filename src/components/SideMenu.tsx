"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Minimal local shape to avoid importing from elsewhere
type MinimalProfile = {
  name?: string;
  age?: string;
  gender?: string;
  eatsAnimalProtein?: string;
  dietary?: string;
  medical?: string;
  medication?: string;
  supplements?: string;
  goals?: string;
};

function countMissing(p: MinimalProfile | null): number {
  if (!p) return 8; // treat everything as missing
  const keys: (keyof MinimalProfile)[] = [
    "age",
    "gender",
    "eatsAnimalProtein",
    "dietary",
    "medical",
    "medication",
    "supplements",
    "goals",
  ];
  return keys.reduce((acc, k) => (p?.[k] ? acc : acc + 1), 0);
}

function firstName(full?: string) {
  const s = (full || "").trim();
  return s ? s.split(/\s+/)[0] : "";
}

function readProfile(): MinimalProfile | null {
  try {
    const raw = localStorage.getItem("profile") || localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as MinimalProfile) : null;
  } catch {
    return null;
  }
}

export default function SideMenu({ title }: { title?: string }) {
  const [open, setOpen] = useState(false);
  const [missingCount, setMissingCount] = useState(0);
  const [greeting, setGreeting] = useState<string>(title || "Hi, there");

  // read profile name + missing count on mount, focus, storage, and light polling
  useEffect(() => {
    const read = () => {
      const p = readProfile();
      setMissingCount(countMissing(p));
      if (!title) {
        const name = firstName(p?.name);
        setGreeting(`Hi, ${name || "there"}`);
      } else {
        setGreeting(title); // if a title prop is provided, always honor it
      }
    };

    read();
    const onFocus = () => read();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "profile") read();
    };
    const id = setInterval(read, 1000); // safe fallback

    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
      clearInterval(id);
    };
  }, [title]);

  return (
    <>
      {/* top bar with ☰ */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-800">{greeting}</h1>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-md border px-3 py-1.5 text-xl leading-none"
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col items-center justify-center space-y-1.5">
            <span className="block h-0.5 w-5 rounded-sm bg-current" />
            <span className="block h-0.5 w-5 rounded-sm bg-current" />
            <span className="block h-0.5 w-5 rounded-sm bg-current" />
          </span>
        </button>
      </header>

      {open && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed right-0 top-0 z-50 h-dvh w-[84%] max-w-sm transform bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Main Menu"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="font-medium">Main Menu</p>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-lg">
            ✕
          </button>
        </div>

        <nav className="grid gap-1 p-2 text-[15px]">
          <MenuLink href="/dashboard" label="Home" onClick={() => setOpen(false)} />
          <MenuLink href="/dashboard" label="Health Scores" onClick={() => setOpen(false)} />
          <MenuLink href="/kit/buy" label="Buy Kit" onClick={() => setOpen(false)} />
          <MenuLink href="/feed" label="Nutrition feed" onClick={() => setOpen(false)} />
          <MenuLink href="/chat" label="Chat Assistant" onClick={() => setOpen(false)} />
          <MenuLink href="/recipes" label="Recipes" onClick={() => setOpen(false)} />
          <MenuLink
            href="/profile"
            label="Profile"
            badge={missingCount > 0 ? String(missingCount) : undefined}
            onClick={() => setOpen(false)}
          />
          <MenuLink href="/orders" label="Orders & Account" onClick={() => setOpen(false)} />
          <MenuLink href="/login" label="Sign Out" onClick={() => setOpen(false)} />
        </nav>
      </aside>
    </>
  );
}

function MenuLink({
  href,
  label,
  onClick,
  badge,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      <span>{label}</span>
      {badge && (
        <span className="ml-2 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
