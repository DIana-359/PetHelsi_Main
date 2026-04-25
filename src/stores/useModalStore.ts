import { create } from "zustand";
import type { ReactNode } from "react";

interface ModalStore {
  isOpen: boolean;
  content: ReactNode;
  open: (content: ReactNode) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  content: null,
  open: content => set({ isOpen: true, content }),
  close: () => set({ isOpen: false, content: null }),
}));
