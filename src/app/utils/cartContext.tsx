"use client";

import { CartItemInterface } from "@/types/cart";
import { createContext, useState } from "react";

export const cartContext = createContext<{
  cart: CartItemInterface[] | null;
  setCart: React.Dispatch<React.SetStateAction<CartItemInterface[] | null>>;
}>({
  cart: null,
  setCart: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItemInterface[] | null>(() => {
    if (typeof window !== "undefined") {
      const cartFromStorage = window.sessionStorage.getItem("cart");
      return cartFromStorage ? JSON.parse(cartFromStorage) : [];
    } else {
      return [];
    }
  });

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};
