import { cartContext } from "@/app/utils/cartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function CartDropdown({
  cartState,
  setCartState,
}: {
  cartState: boolean;
  setCartState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cart, setCart } = useContext(cartContext);
  return (
    <>
      {cartState && (
        <div
          className="border-b w-full absolute md:w-96 z-10 right-0 top-24 lg:top-32 border-greyLight bg-white px-4 py-8 sm:px-6 lg:px-8 rounded-xl animate-cartDropdown"
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setCartState(!cartState)}
            className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              {cart?.map((cartItem, index) => {
                return (
                  <li
                    className="flex items-center justify-center gap-4"
                    key={index}
                  >
                    <Image
                      src={cartItem.imageUrl}
                      alt={"poster of item"}
                      width={80}
                      height={80}
                    />
                    <div className="flex flex-col items-start">
                      <p>{cartItem.title}</p>
                      <p>Storlek: {cartItem.size}</p>
                      <p>Antal: {cartItem.quantity}</p>
                      <p className="font-semibold">{cartItem.price}</p>
                    </div>
                    <div
                      onClick={() => {
                        const removedItemFromCart = [...cart];
                        removedItemFromCart.splice(index, 1);
                        setCart(removedItemFromCart);
                      }}
                      className="text-xl ml-9 cursor-pointer"
                    >
                      <span> &#10005;</span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center flex-col gap-6">
              {cart?.length !== 0 ? (
                <Link
                  href="/cart"
                  className="w-52 rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 text-center mt-4"
                >
                  Till kassan
                </Link>
              ) : (
                <p className="text-lg font-medium">Din varukorg är tom</p>
              )}

              <button
                onClick={() => setCartState(!cartState)}
                className="text-sm text-gray-500 underline underline-offset-4 transition hover:text-grey"
              >
                Fortsätt handla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
