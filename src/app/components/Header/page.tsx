"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import List from "./List";
import Account from "./Account";
import CartDropdown from "./CartDropdown";
import { cartContext } from "@/app/utils/cartContext";

export default function Header() {
  const { cart } = useContext(cartContext);

  const [isActive, setIsActive] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [itemsLength, setItemLength] = useState(cart?.length);

  useEffect(() => {
    setItemLength(cart?.length);
    setCartState(true);
  }, [cart]);

  return (
    <header>
      <nav className="flex items-center justify-between mx-6 pt-5">
        <Link href={"/"}>
          <Image
            src={"/header/logo.svg"}
            alt="logotype for webshop"
            width={30}
            height={30}
            quality={100}
          />
        </Link>
        <div
          className={`flex items-center justify-between flex-col md:flex-row absolute md:relative top-24 md:top-0 right-0 p-5 rounded-b-2xl md:rounded-none w-full lg:flex animate-slideInNav bg-background z-10 -mt-9 md:mt-0  ${
            !isActive && "hidden"
          }`}
        >
          <>
            <List />
          </>

          <>
            <SearchInput />
          </>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div
              onClick={() => {
                setCartState(!cartState);
              }}
            >
              <span className="cartSize">{itemsLength}</span>
              <Image
                className="mr-0.5 lg:mr-0"
                src={"/header/shopping-cart-icon.png"}
                alt="shopping cart icon"
                width={35}
                height={35}
                quality={100}
              />
            </div>
            {cartState && (
              <CartDropdown cartState={cartState} setCartState={setCartState} />
            )}

            <div>
              <Account />
            </div>
          </div>
          <div onClick={() => setIsActive(!isActive)} className="lg:hidden">
            {!isActive ? (
              <Image
                src={"/header/burger-menu-icon.svg"}
                alt="hamburger menu icon"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src={"/header/cross-icon.svg"}
                alt="cross icon"
                width={40}
                height={40}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
