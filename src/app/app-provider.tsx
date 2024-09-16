"use client";

import { useState } from "react";

import { clientSessionToken } from "@/http";

const AppProvider = ({
  children,
  initialSessionToken = "",
}: Readonly<{
  children: React.ReactNode;
  initialSessionToken?: string;
}>) => {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
};

export default AppProvider;
