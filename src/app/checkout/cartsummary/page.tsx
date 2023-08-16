"use client";

import React, { useContext } from "react";
import CartItems from "../../components/Checkout/CartItems";
import Summary from "../../components/Checkout/Summary";
import { cartContext } from "@/app/utils/cartContext";

export default function Page() {
  const { cart, setCart } = useContext(cartContext);

  return (
    <div className="flex flex-col items-center md:flex-row shadow-md my-10 mx-10">
      <div className="md:w-3/4 bg-white px-10 py-10 w-full">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Kundkorg</h1>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
            Antal
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
            Pris
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
            Total
          </h3>
        </div>

        <CartItems cartData={cart} setCart={setCart} />
      </div>
      <Summary cartData={cart} />
    </div>
  );
}
