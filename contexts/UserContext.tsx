"use client";

import { User } from "@/types/User";
import { createContext, PropsWithChildren, useContext } from "react";

interface UserContextType {
  user: User | null;
}

const UserContext = createContext({ user: null } as UserContextType);

interface UserProviderProps {
  user: User | null;
}

export const UserProvider = ({
  user,
  children,
}: PropsWithChildren<UserProviderProps>) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
