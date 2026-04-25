import { create } from "zustand";

interface UIStore {
  isOpenMenu: boolean;
  isOpenModalDashboard: boolean;
  isVetBackground: boolean;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModalDashboard: (value: boolean) => void;
  setIsVetBackground: (value: boolean) => void;
}

export const useUIStore = create<UIStore>(set => ({
  isOpenMenu: false,
  isOpenModalDashboard: false,
  isVetBackground: false,
  setIsOpenMenu: value => set({ isOpenMenu: value }),
  setIsOpenModalDashboard: value => set({ isOpenModalDashboard: value }),
  setIsVetBackground: value => set({ isVetBackground: value }),
}));
