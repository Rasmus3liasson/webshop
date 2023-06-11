"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function CategoryDropdown() {
  const pathName = usePathname();
  const [category, setCategory] = useState(false);

  const toggleDropdown = () => {
    setCategory(!category);
  };

  const generateListItem = (href: string, textCategory: string) => {
    const isActive = pathName.includes(href);
    const className = `link-text ${isActive ? "underline" : ""}`;

    return (
      <Link className={className} href={href}>
        <li>{textCategory}</li>
      </Link>
    );
  };
  return (
    <>
      <li className="text-lg flex items-center gap-1" onClick={toggleDropdown}>
        Kategorier
        <Image
          className={`${category && "rotate-180 duration-100"}`}
          src={"/list/down-arrow.svg"}
          alt="arrow for list to show if dropdown is active"
          width={20}
          height={20}
        />
      </li>

      {category && (
        <ul className="flex flex-col items-center gap-4 mt-3">
          {generateListItem("/clothes/jackets", "Jackor")}
          {generateListItem("/clothes/shirts", "Skjortor")}
          {generateListItem("/clothes/t-shirts", "T-shirt")}
          {generateListItem("/clothes/pants", "Byxor")}
          {generateListItem("/clothes/jeans", "Jeans")}
          {generateListItem("/clothes/shoes", "Skor")}
        </ul>
      )}
    </>
  );
}
