"use client";

import { cartContext } from "@/app/utils/cartContext";
import { getItemsFromApi } from "@/app/utils/dataFromApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Account from "./Account";
import CartDropdown from "./CartDropdown";
import List from "./List";
import SearchInput from "./SearchInput";

export default function Header() {
  const { cart } = useContext(cartContext);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const prevPath = useRef<string>(pathName);

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
      cartState:
        currentCartLength > prev.copyCartLength ? true : prev.cartState,
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

  useEffect(() => {
    const clickOutsideDropdown = (e: MouseEvent) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(e.target as Node)
      ) {
        setState((prev) => ({ ...prev, cartState: false }));
      }
    };

    if (state.cartState) {
      document.addEventListener("mousedown", clickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", clickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutsideDropdown);
    };
  }, [state.cartState]);

  useEffect(() => {
    if (prevPath.current !== pathName) {
      setState((prev) => ({ ...prev, isActive: false }));
      prevPath.current = pathName;
    }
  }, [pathName]);

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
          className={`flex items-center justify-between flex-col md:flex-row absolute md:relative top-28 md:top-0 right-0 px-5 rounded-b-2xl md:rounded-none w-full lg:flex animate-slideInNav bg-background z-20 -mt-9 md:mt-0 ${
            !state.isActive && "hidden"
          }`}
        >
          <List
            setIsActive={(isActive) =>
              setState((prev) => ({ ...prev, isActive }))
            }
            pathName={pathName}
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
              <div className="relative py-2 mr-3 cursor-pointer">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                    {state.itemsLength}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="file: mt-4 h-6 w-6"
                >
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
            </div>

            {state.cartState && (
              <div ref={cartDropdownRef}>
                <CartDropdown
                  cartState={state.cartState}
                  setCartState={() =>
                    setState((prev) => ({
                      ...prev,
                      cartState: !prev.cartState,
                    }))
                  }
                />
              </div>
            )}
            <Account />
          </div>
          <div
            onClick={() =>
              setState((prev) => ({ ...prev, isActive: !prev.isActive }))
            }
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
