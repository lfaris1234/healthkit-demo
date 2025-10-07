"use client";
import { createContext, useContext, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";

type CtxType = ReturnType<typeof useAuth> | null;
const Ctx = createContext<CtxType>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuth();
  const value = useMemo(() => store, [store.user]); // rerender when user changes
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
