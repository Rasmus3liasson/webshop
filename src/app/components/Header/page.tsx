"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchInput from "./SearchInput";
import List from "./List";
import Account from "./Account";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <header>
      <nav className="flex items-center justify-between mx-6 pt-5">
        <Link href="/">
          <Image
            src={"/header/logo.svg"}
            alt="logotype for webshop"
            width={30}
            height={30}
            quality={100}
          />
        </Link>
        <div
          className={`flex items-center justify-between flex-col md:flex-row absolute md:relative top-24 md:top-0 right-0 p-5 rounded-b-2xl md:rounded-none w-full lg:flex animate-slideInNav bg-white z-10 ${
            !isActive && "hidden"
          }`}
        >
          <>
            <List />
          </>

          <div>
            <SearchInput />
          </div>
        </div>

        {/* Needs to correct the span so it is center */}
        <div className="flex">
          <div></div>
          <div className="flex items-center">
            <span className="absolute top-8 right-28 lg:top-14 lg:right-16">
              3
            </span>
            <Image
              className="mr-0.5 lg:mr-0"
              src={"/header/shopping-cart-icon.png"}
              alt="shopping cart icon"
              width={30}
              height={30}
              quality={100}
            />
            <div>
              <Account />
            </div>
          </div>
          <div className="lg:hidden">
            {!isActive ? (
              <Image
                src={"/header/burger-menu-icon.svg"}
                alt="hamburger menu icon"
                width={40}
                height={40}
                onClick={toggleNavbar}
              />
            ) : (
              <Image
                src={"/header/cross-icon.svg"}
                alt="cross icon"
                width={40}
                height={40}
                onClick={toggleNavbar}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
