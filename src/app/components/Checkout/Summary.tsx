import { CartItemInterface } from "@/types/cart";
import React from "react";

export default function Summary({
  cartData,
}: {
  cartData: CartItemInterface[] | null;
}) {
  // Calculate the total cost of items in the cart
  let totalCost = 0;
  if (cartData) {
    cartData.forEach((item) => {
      totalCost += item.price * item.quantity;
      totalCost = Math.round(totalCost * 100) / 100;
    });
  }

  return (
    <div className="md:w-1/4 w-full px-8 pb-10 flex items-center justify-center flex-col">
      <div className="mt-8 flex flex-col items-center justify-between">
        <div className="py-6 text-lg font-semibold flex flex-col items-center">
          <span>Total kostnad</span>
          <span>{totalCost} €</span>
        </div>
        <button className="text-md bg-black text-white p-3 rounded-3xl hover:scale-102 hover:opacity-90 duration-200 active:scale-98">
          Till betalning
        </button>
      </div>
    </div>
  );
}
