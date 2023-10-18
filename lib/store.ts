import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
export const useThemeState = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme" }
  )
);

type UserState = {
  id: string;
  setId: (id: string) => void;
  username: string;
  setUsername: (username: string) => void;
  createdAt: string;
  setCreatedAt: (date: string) => void;
  isSignedIn: boolean;
  setIsSignedIn: (status: boolean) => void;
};

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      id: "",
      setId: (id) => set((state) => ({ id: id })),
      username: "",
      setUsername: (username) => set((state) => ({ username: username })),
      createdAt: "",
      setCreatedAt: (date) => set((state) => ({ createdAt: date })),
      isSignedIn: false,
      setIsSignedIn: (status) => set((state) => ({ isSignedIn: status })),
    }),
    { name: "user" }
  )
);
