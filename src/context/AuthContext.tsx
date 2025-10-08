// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type User = { id: string; name: string; email: string } | null;
type Ctx = { user: User; setUser: (u: User) => void };

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within <AuthProvider>");
  return ctx;
}
