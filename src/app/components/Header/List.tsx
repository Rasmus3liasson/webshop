"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CategoryList from "./CategoryList";

export default function List() {
  const pathName = usePathname();

  const [categoryList, setCategoryList] = useState(false);

  const toggleCategoryList = () => {
    setCategoryList(!categoryList);
  };

  return (
    <>
      <ul className="flex flex-col md:flex-row gap-7 lg:ml-36 md:gap-24 items-center md:m-0 mb-5">
        <li className={`link-text ${pathName === "/" && "underline"} `}>
          <Link href="/">Home</Link>
        </li>

        <li
          onClick={toggleCategoryList}
          className={`link-text ${
            categoryList && "underline duration-100"
          }  flex `}
        >
          Category
          <Image
            className={`ml-2 ${categoryList && "rotate-180 duration-100"}`}
            src={"/down-arrow.svg"}
            alt="arrow indicator"
            width={20}
            height={20}
          />
        </li>
        {categoryList && <CategoryList />}
        <li className={`link-text ${pathName === "/about" && "underline"} `}>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </>
  );
}
