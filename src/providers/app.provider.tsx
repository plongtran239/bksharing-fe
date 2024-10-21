"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserType } from "@/schemas";

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
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userState, setUserState] = useState<UserType | null>(() => {
    return null;
  });

  const setUser = useCallback(
    (user: UserType | null) => {
      setUserState(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setUserState]
  );

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUserState(_user ? JSON.parse(_user) : null);
  }, [setUserState]);

  return (
    <AppContext.Provider
      value={{
        user: userState,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
