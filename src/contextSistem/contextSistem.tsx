"use client";
import { createContext, useContext, useState } from "react";

interface ISistem {
  isOpenMenu: boolean;
  setIsOpenMenu: (value: boolean) => void;
  isShowNotification: boolean;
  setShowNotification: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isMounted: boolean;
  setIsMounted: (value: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalContent: React.ReactNode;
  setModalContent: (value: React.ReactNode) => void;
  isOpenModalDashboard: boolean;
  setIsOpenModalDashboard: (value: boolean) => void;
  isVetBackground: boolean;
  setIsVetBackground: (value: boolean) => void;
}

const ContextSistem = createContext<ISistem | undefined>(undefined);

export function useSistem() {
  const context = useContext(ContextSistem);
  if (!context) {
    throw new Error("context error");
  }
  return context;
}

export const SistemProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isShowNotification, setShowNotification] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isOpenModalDashboard, setIsOpenModalDashboard] = useState(false);
  const [isVetBackground, setIsVetBackground] = useState(false);

  return (
    <ContextSistem.Provider
      value={{
        isOpenMenu,
        setIsOpenMenu,
        isShowNotification,
        setShowNotification,
        isLoading,
        setIsLoading,
        isMounted,
        setIsMounted,
        isModalOpen,
        setIsModalOpen,
        modalContent,
        setModalContent,
        isOpenModalDashboard,
        setIsOpenModalDashboard,
        isVetBackground,
        setIsVetBackground,
      }}>
      {children}
    </ContextSistem.Provider>
  );
};
