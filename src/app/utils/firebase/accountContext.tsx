"use client";
import { AccountContextInterface, UserDataInterface } from "@/types/account";
import React, { createContext, useState } from "react";

export const accountContext = createContext<AccountContextInterface | null>(
  null
);

export function AccountContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserDataInterface | null>(null);

  return (
    <accountContext.Provider value={{ user, setUser }}>
      {children}
    </accountContext.Provider>
  );
}
