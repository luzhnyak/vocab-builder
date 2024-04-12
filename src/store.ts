import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IUser } from "./types";
// import { login, register, logout } from "./services/vocabApi";

interface AuthState {
  currentUser: IUser | null;
  isLogin: boolean;

  login: (user: IUser) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        isLogin: false,
        login: (user) => set(() => ({ currentUser: user, isLogin: true })),
        logout: () => set(() => ({ currentUser: null, isLogin: false })),
      }),
      { name: "auth" }
    )
  )
);
