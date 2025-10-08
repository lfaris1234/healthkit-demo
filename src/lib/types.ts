import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type KitResult = {
  id: string;
  date: string;        
  score: number;       
  imageUrl?: string;   
  feeling?: string;    
  note?: string;
};

export type FeedItem = { 
    id: string; 
    title: string; 
    tag?: string; 
    body: string; 
    image: string; 
};

// in the future consider putting user/profile data in a separate ts file

export type Profile = {
  name?: string;
  age?: string;
  gender?: "Male" | "Female" | "" ;
  eatsAnimalProtein?: "Yes" | "No" | "" ;
  dietary?: string;
  medical?: string;
  medication?: string;
  supplements?: string;
  goals?: string;
};

export type ProfileData = {
  name?: string;
  age?: string;
  gender?: string;
  animalProtein?: string;
  restrictions?: string;
  conditions?: string;
  medication?: string;
  supplements?: string;
  goals?: string;
};

type UserState = {
  profile: ProfileData;
  incompleteCount: number;
  setProfile: (p: Partial<ProfileData>) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  profile: {},
  incompleteCount: 0,
  setProfile: (p) => {
    const merged = { ...get().profile, ...p };
    const missing = Object.values(merged).filter((v) => !v || v === "").length;
    set({ profile: merged, incompleteCount: missing });
  },
}));

