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

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState<CartItemInterface[] | null>(() => {
    const cartFromStorage = sessionStorage.getItem("cart");
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
  });

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};
