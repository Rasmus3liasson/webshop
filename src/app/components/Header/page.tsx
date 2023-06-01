"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const hej = [
    "hej",
    "hello",
    "holar",
    "holat",
    "hola",
    "hola",
    "hola",
    "hola",
  ];
  const [isActive, setIsActive] = useState(false);
  const [inputField, setInputField] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<string[]>();
  const [movieTitleArr, setMovieTitleArr] = useState<string[]>(hej);
  const [movieImageArr, setMovieImageArr] = useState<string[]>([]);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  //searchIcon
  const toggleInputField = () => {
    setInputField(!inputField);
    console.log(inputField);
  };

  //filter and show result that match value
  const manageInput = (event: { target: { value: string } }) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    if (inputValue.length >= 2) {
      const filteredResults = movieTitleArr.filter((input) =>
        input.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchResult(filteredResults);
    } else {
      setSearchResult([]);
    }
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
            <ul className="flex flex-col md:flex-row gap-7 lg:ml-36 md:gap-24 top-24 items-center md:m-0 mb-5">
              <li className={`link-text `}>
                <Link href="/">Home</Link>
              </li>
              <li className="link-text">
                <Link href="/">Category</Link>
              </li>
              <li className="link-text">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <form>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Image
                    src={"/search-icon.svg"}
                    alt="search icon"
                    width={30}
                    height={30}
                    quality={100}
                  />
                </div>
                <input
                  onChange={manageInput}
                  type="search"
                  className="w-full p-2 pl-10 text-white rounded-xl bg-grey"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
            {/* Condition to show dropdown */}
            {searchInput.length > 0 && (
              <div>
                <ul className="grid grid-cols-4 mt-4 gap-4">
                  {searchResult?.map((movieTitle, index) => {
                    const movieIndex = movieTitleArr.indexOf(movieTitle);

                    // Retrieve image using the index of title
                    const imageUrl = movieImageArr[movieIndex];
                    return (
                      <li key={index}>
                        <Image
                          src={"/dummy.jpeg"}
                          alt="poster of movie"
                          width={120}
                          height={130}
                        />
                        <Link
                          className="dropdown-item"
                          href={"#"}
                          onClick={() => setSearchInput(movieTitle)}
                        >
                          <p>{movieTitle}</p>
                          <p>price</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* If no matching results */}
            {searchInput.length > 1 && searchResult?.length === 0 && (
              <div>
                <ul>
                  <li className="no-match">Ingen matchning</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Needs to correct the span so it is center */}
        <div className="flex">
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
