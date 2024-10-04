"use client";

import { createContext, useContext, useState } from "react";

import { clientSessionToken } from "@/http";

export type UserType = {
  name: string;
  avatar: string | null;
};

const AppContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

const AppProvider = ({
  children,
  initialSessionToken = "",
}: Readonly<{
  children: React.ReactNode;
  initialSessionToken?: string;
}>) => {
  const [user, setUser] = useState<UserType | null>(null);

  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
