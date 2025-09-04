"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { useSistem } from "../contextSistem/contextSistem";
import { IProfileOwner } from "@/app/types/ownerTypes";

interface IAuth {
  userData: IProfileOwner | null;
  setUserData: (value: IProfileOwner | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context error");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<IProfileOwner | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setIsLoading, setIsMounted } = useSistem();

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");

    if (tokenFromCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
    setIsMounted(true);
  }, [setIsLoggedIn, setIsLoading, setIsMounted]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};