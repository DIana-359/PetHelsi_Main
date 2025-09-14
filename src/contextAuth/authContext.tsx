"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { IProfileOwner } from "@/app/types/ownerTypes";

interface IAuth {
  userData: IProfileOwner | null;
  setUserData: (value: IProfileOwner | null) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context error");
  }
  return context;
}

export const AuthProvider = ({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: IProfileOwner | null;
}) => {
  const [userData, setUserData] = useState<IProfileOwner | null>(initialUser);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/proxy/get-profile", {
          credentials: "include",
        });
        if (res.ok) {
          const json = await res.json();
          setUserData(json);
        }
      } catch (e) {
        console.error("Error fetching profile", e);
      }
    };
    loadProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
