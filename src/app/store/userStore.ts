import { create } from "zustand";
import { User } from "next-auth";
import { getSession } from "next-auth/react";
import { IProfile } from "../interfaces/profile.interface";
import axiosInstance from "../utils/axios.helper";

interface UserStore {
  user: User | null;
  loading: boolean;
  profile: IProfile | null;
  getUserSession: () => Promise<void>;
  getUserProfile: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  profile: null,
  getUserSession: async () => {
    set({ loading: true });
    try {
      const session = await getSession();
      set({ user: session?.user || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getUserProfile: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/profile");
      set({ profile: res.data.data || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
