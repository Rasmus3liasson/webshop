"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CategoryList from "./CategoryList";

export default function List({
  setIsActive,
}: {
  setIsActive: (newState: boolean) => void;
}) {
  const pathName = usePathname();

  const [categoryList, setCategoryList] = useState(false);

  const setNavState = () => {
    setIsActive(false);
  };

  return (
    <>
      <ul className="flex flex-col md:flex-row gap-7 lg:ml-36 md:gap-20 items-center md:m-0 mb-5">
        <li
          onClick={setNavState}
          className={`link-text-lg ${pathName === "/" && "underline"} `}
        >
          <Link href="/">Hem</Link>
        </li>

        <li
          className={`link-text-lg ${
            categoryList && "duration-100"
          }  flex `}
        >
          <Link href={"/clothes"}>
            <span>Kläder</span>
          </Link>
          <Image
            onClick={() => setCategoryList(!categoryList)}
            className={`ml-3 ${categoryList && "rotate-180 duration-100"}`}
            src={"/list/down-arrow.svg"}
            alt="arrow indicator"
            width={20}
            height={20}
          />
        </li>

        {categoryList && (
          <CategoryList
            setListState={setCategoryList}
            setNavActive={setIsActive}
          />
        )}
        <li
          onClick={setNavState}
          className={`link-text-lg ${pathName === "/about" && "underline"} `}
        >
          <Link href="/about">Om oss</Link>
        </li>
      </ul>
    </>
  );
}
