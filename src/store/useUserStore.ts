import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  email: string | null;
  id: number | null;
  password: string | null;
  setUser: (user: { email: string; password: string; id: number }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      id: null,
      password: null,
      setUser: (user) =>
        set({
          email: user.email,
          id: user.id,
          password: user.password,
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        email: state.email,
        id: state.id,
      }),
    }
  )
);
