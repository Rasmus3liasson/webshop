"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchInput from "./SearchInput";
import List from "./List";

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
            src={"/logo.svg"}
            alt="logotype for webshop"
            width={30}
            height={30}
            quality={100}
          />
        </Link>
        <div
          className={`flex items-center justify-between flex-col md:flex-row absolute md:relative top-24 md:top-0 right-0 p-5 rounded-b-2xl md:rounded-none w-full lg:flex animate-slideInNav  ${
            !isActive && "hidden"
          }`}
        >
          <div>
            <List />
          </div>
          <div>
            <SearchInput searchInput={isActive} />
          </div>
        </div>

        {/* Needs to correct the span so it is center */}
        <div className="flex">
          <div></div>
          <div className="flex items-center">
            <span className="absolute top-8 right-32 lg:top-14 lg:right-20">
              3
            </span>
            <Image
              className="mr-2"
              src={"/shopping-cart-icon.png"}
              alt="shopping cart icon"
              width={30}
              height={30}
              quality={100}
            />

            <Link href={"/login"}>Login</Link>
          </div>
          <div className="lg:hidden">
            {!isActive ? (
              <Image
                src={"/burger-menu-icon.svg"}
                alt="hamburger menu icon"
                width={40}
                height={40}
                onClick={toggleNavbar}
              />
            ) : (
              <Image
                src={"/cross-icon.svg"}
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
