"use client";
import { createContext, useContext, useState } from "react";
import { IProfileOwner } from "@/app/types/ownerTypes";

interface IAuth {
  userData: IProfileOwner | null;
  setUserData: (value: IProfileOwner | null) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext error");
  }
  return context;
}

export const AuthProvider = ({
  children,
  user = null,
}: {
  children: React.ReactNode;
  user?: IProfileOwner | null;
}) => {
  const [userData, setUserData] = useState<IProfileOwner | null>(user);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
