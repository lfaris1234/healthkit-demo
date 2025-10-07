"use client";
import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

const Ctx = createContext<ReturnType<typeof useAuth> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuth();
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
