"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

type AuthStore = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const store = useAuth();
  // rerender consumers only when something in store changes
  const value = useMemo(() => store, [store.user]); 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthStore {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within <AuthProvider>");
  }
  return ctx;
}

