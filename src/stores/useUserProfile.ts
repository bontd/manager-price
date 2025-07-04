import { create } from "zustand";

interface UserProfileState {
  userProfile: any;
  setUserProfile: (userProfile: any) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: undefined,
  setUserProfile: (userProfile: any) => set({ userProfile }),
}));
