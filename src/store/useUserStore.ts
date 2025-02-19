import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  profileImage: null,
  setUser: (user) => set(user),
  clearUser: () =>
    set({
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      profileImage: null,
    }),
}));
