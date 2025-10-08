// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = { id: string; name: string; email: string } | null;
export type Profile = {
  name?: string;
  age?: string;
  phone?: string;
  gender?: string;
  animalProtein?: string;
  dietary?: string;
  conditions?: string;
  medication?: string;
  supplements?: string;
  goals?: string;
};

type Ctx = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>; // <-- accepts function
  reset: () => void;
};


const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<Profile>({});

  // hydrate on first load
  useEffect(() => {
    const u = localStorage.getItem("user");
    const p = localStorage.getItem("profile");
    if (u) setUser(JSON.parse(u));
    if (p) setProfile(JSON.parse(p));
  }, []);

  // persist whenever these change
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const reset = () => {
    setUser(null);
    setProfile({});
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("onboarding.quick");
    localStorage.removeItem("onboarding.detail");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, profile, setProfile, reset }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within <AuthProvider>");
  return ctx;
}
