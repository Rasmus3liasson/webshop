"use client";

import { CartItemInterface } from "@/types/cart";

import Image from "next/image";
import React from "react";

export default function CartItems({
  cartData,
  setCart,
}: {
  cartData: CartItemInterface[] | null;
  setCart: React.Dispatch<React.SetStateAction<CartItemInterface[] | null>>;
}) {
  console.log(cartData);

  return (
    <>
      {cartData?.map((item, index) => (
        <div
          key={index}
          className="flex items-center hover:bg-greyLight duration-200 ease-out -mx-8 px-6 py-5"
        >
          <div className="flex w-2/5">
            <div>
              <Image
                src={item.imageUrl}
                alt={"image of the item"}
                width={90}
                height={90}
              />
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{item.title}</span>
              <span
                onClick={() => {
                  const updatedCart = [...cartData];
                  updatedCart.splice(index, 1);

                  setCart(updatedCart);
                  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
                }}
                className="font-semibold hover:text-red-600 text-grey text-xs"
              >
                Ta bort
              </span>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <span className="text-center w-1/5 font-semibold text-sm">
              {item.quantity}
            </span>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">
            {item.price}
          </span>
          <span className="text-center w-1/5 font-semibold text-sm">
            {item.price * item.quantity}
          </span>
        </div>
      ))}
    </>
  );
}
