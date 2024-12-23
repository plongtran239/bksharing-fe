"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ROLES } from "@/constants/enum";
import { Websocket } from "@/lib/websocket";
import { UserType } from "@/schemas";

const AppContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  paymentId: number | null;
  setPaymentId: (paymentId: number | null) => void;
  openMessageBox: boolean;
  setOpenMessageBox: (openMessageBox: boolean) => void;
  chatRoomId: number | null;
  setChatRoomId: (chatRoomId: number | null) => void;
  socketClient: Websocket | null;
}>({
  user: null,
  setUser: () => {},
  paymentId: null,
  setPaymentId: () => {},
  openMessageBox: false,
  setOpenMessageBox: () => {},
  chatRoomId: null,
  setChatRoomId: () => {},
  socketClient: null,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

const AppProvider = ({ children }: PropsWithChildren) => {
  const [socketClient, setSocketClient] = useState<Websocket | null>(null);
  const socketClientRef = useRef<Websocket | null>(null);

  const [userState, setUserState] = useState<UserType | null>(() => null);
  const [paymentIdState, setPaymentIdState] = useState<number | null>(
    () => null
  );

  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);

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
    const ws = new Websocket();
    socketClientRef.current = ws;

    setSocketClient(ws);

    return () => {
      console.log("Disconnecting from websocket server...");
      ws.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userState?.accountType === ROLES.ADMIN && socketClientRef.current) {
      console.log("Admin is not allowed to connect to websocket server.");
      socketClientRef.current.disconnect();
    } else {
      if (userState && socketClientRef.current) {
        console.log("Connecting to websocket server...");
        socketClientRef.current.connect(userState?.accessToken);
      }
    }

    return () => {
      console.log("Disconnecting from websocket server...");
      socketClientRef.current?.disconnect();
    };
  }, [userState]);

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
        chatRoomId,
        setChatRoomId,
        socketClient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
