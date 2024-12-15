"use client";

import {
  PropsWithChildren,
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
  paymentId: number | null;
  setPaymentId: (paymentId: number | null) => void;
  openMessageBox: boolean;
  setOpenMessageBox: (openMessageBox: boolean) => void;
}>({
  user: null,
  setUser: () => {},
  paymentId: null,
  setPaymentId: () => {},
  openMessageBox: false,
  setOpenMessageBox: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

const AppProvider = ({ children }: PropsWithChildren) => {
  const [userState, setUserState] = useState<UserType | null>(() => {
    return null;
  });

  const [paymentIdState, setPaymentIdState] = useState<number | null>(() => {
    return null;
  });

  const [openMessageBox, setOpenMessageBox] = useState(false);

  const setUser = useCallback(
    (user: UserType | null) => {
      setUserState(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setUserState]
  );

  const setPaymentId = useCallback(
    (paymentId: number | null) => {
      setPaymentIdState(paymentId);
      localStorage.setItem("paymentId", JSON.stringify(paymentId));
    },
    [setPaymentIdState]
  );

  useEffect(() => {
    const _user = localStorage.getItem("user");
    const _paymentId = localStorage.getItem("paymentId");

    setUserState(_user ? JSON.parse(_user) : null);
    setPaymentIdState(_paymentId ? JSON.parse(_paymentId) : null);
  }, [setUserState, setPaymentIdState]);

  return (
    <AppContext.Provider
      value={{
        user: userState,
        setUser,
        paymentId: paymentIdState,
        setPaymentId,
        openMessageBox,
        setOpenMessageBox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
