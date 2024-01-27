"use client";

import { cartContext } from "@/app/utils/cartContext";
import { getItemsFromApi } from "@/app/utils/dataFromApi";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Account from "./Account";
import CartDropdown from "./CartDropdown";
import List from "./List";
import SearchInput from "./SearchInput";

export default function Header() {
  const { cart } = useContext(cartContext);

  const [state, setState] = useState({
    isActive: false,
    cartState: false,
    itemsLength: cart?.length || 0,
    copyCartLength: cart?.length || 0,
    itemData: [],
  });

  useEffect(() => {
    const currentCartLength = cart?.length || 0;

    setState((prev) => ({
      ...prev,
      copyCartLength: currentCartLength,
      itemsLength: cart?.length || 0,
      cartState: currentCartLength > prev.copyCartLength ? true : prev.cartState,
    }));
  }, [cart]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItemsFromApi();
        setState((prev) => ({ ...prev, itemData: data }));
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      }
    }

    fetchData();
  }, []);

  return (
    <header>
      <nav className="flex items-center justify-between mx-6 pt-5 font">
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
          className={`flex items-center justify-between flex-col md:flex-row absolute md:relative top-24 md:top-0 right-0 p-5 rounded-b-2xl md:rounded-none w-full lg:flex animate-slideInNav bg-background z-10 -mt-9 md:mt-0 ${
            !state.isActive && "hidden"
          }`}
        >
          <List
            setIsActive={(isActive) => setState((prev) => ({ ...prev, isActive }))}
          />
          <SearchInput data={state.itemData} />
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div
              className="relative"
              onClick={() =>
                setState((prev) => ({ ...prev, cartState: !prev.cartState }))
              }
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-3 pr-1 md:pr-0">
                <span>{state.itemsLength}</span>
              </div>
              <Image
                className="mr-0.5 lg:mr-0"
                src={"/header/shopping-cart-icon.png"}
                alt="shopping cart icon"
                width={35}
                height={35}
                quality={100}
              />
            </div>
            {state.cartState && (
              <CartDropdown
                cartState={state.cartState}
                setCartState={() => setState((prev) => ({ ...prev, cartState: !prev.cartState }))}
              />
            )}
            <Account />
          </div>
          <div
            onClick={() => setState((prev) => ({ ...prev, isActive: !prev.isActive }))}
            className="lg:hidden"
          >
            {!state.isActive ? (
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