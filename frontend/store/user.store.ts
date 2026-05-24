import { create } from "zustand";

interface School {
  name: string;
  city: string;
}

interface User {
  name: string;
  role: string;
  avatar: string;
  school: School;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "John Doe",
    role: "Teacher",
    avatar: "/Avatar.png",
    school: {
      name: "Delhi Public School",
      city: "Bokaro Steel City",
    },
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
    });

    window.location.href = "/";
  },
}));