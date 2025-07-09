"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { readData } from "../../firebase/readMethods";
import { Pet, User, UserData } from "@/types";
import React from "react";

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  currentPet: Pet | null;
  setCurrentPet: React.Dispatch<React.SetStateAction<Pet | null>>;
  refreshUserData: (user: User | null) => Promise<void>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);

  const refreshUserData = async (user: User | null) => {
    if (user) {
      try {
        const data = await readData(user.uid);
        setUserData(data);
        setCurrentPet(null);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        currentPet,
        setCurrentPet,
        refreshUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
