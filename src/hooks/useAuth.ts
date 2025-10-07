import { create } from "zustand";

type AuthState = {
  user: { id: string; email: string } | null;
  setUser: (u: AuthState["user"]) => void;
  signOut: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null })
}));
