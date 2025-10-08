"use client";

import { useCallback, useState } from "react";
import type { User } from "@/lib/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    setUser(null);
    // (optional) also clear any localStorage/session cookies here
  }, []);

  return { user, setUser, logout } as const;
}
