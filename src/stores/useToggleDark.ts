import { create } from "zustand";

interface DarkModeState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (isDarkMode: boolean) => void;
}

export const useToogleDark = create<DarkModeState>((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
}));