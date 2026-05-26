import { create } from "zustand";

import { authService }
  from "@/services/auth.service";

interface User {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  avatar: string;

  school: {
    name: string;

    city: string;
  };
}

interface AuthStore {
  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  fetchMe: () => Promise<void>;

  logout: () => Promise<void>;

  setUser: (user: User) => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    loading: true,

    isAuthenticated: false,

    setUser: (user) =>
      set({
        user,

        isAuthenticated: true,
      }),

    fetchMe: async () => {
      try {
        const user =
          await authService.getMe();

        set({
          user,

          isAuthenticated: true,

          loading: false,
        });
      } catch {
        set({
          user: null,

          isAuthenticated: false,

          loading: false,
        });
      }
    },

    logout: async () => {
      await authService.logout();

      set({
        user: null,

        isAuthenticated: false,
      });
    },
  }));