import { create } from "zustand";
import { IUser } from "../types/Api";

type UserState = {
  userId: number;
  isLoggedIn: boolean;
  userData: IUser | null;
  setUserId: (userId: number) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: IUser | null) => void;
};

export const useUserStore = create<UserState>()((set) => ({
  userId: 1,
  isLoggedIn: false,
  userData: null,
  setUserId: (userId: number) => set({ userId }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUserData: (userData: IUser | null) => set({ userData }),
}));
