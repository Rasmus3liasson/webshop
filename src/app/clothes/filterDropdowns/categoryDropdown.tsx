"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FilteredDataInterface } from "@/types/filter";
import { handleFilterSettings } from "@/app/utils/functions/filterArray";

export default function CategoryDropdown({
  filterData,
  setCategoryFilter,
}: {
  filterData: FilteredDataInterface[];
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [category, setCategory] = useState(false);

  const searchParam = useSearchParams();
  const queryStringColor = searchParam.get("category");

  const toggleDropdown = () => {
    setCategory(!category);
  };

  const generateListItem = () => {
    const categoryData = filterData.categories;

    const categoryList = categoryData.map(
      (categoryName: string, index: number) => {
        const isActive = queryStringColor
          ?.toUpperCase()
          ?.includes(categoryName.toUpperCase());
        const className = `link-text ${isActive ? "hidden" : ""}`;

        return (
          <li
            onClick={() =>
              handleFilterSettings(categoryName, setCategoryFilter)
            }
            className={className}
            key={index}
          >
            {categoryName}
          </li>
        );
      }
    );
    return categoryList;
  };
  return (
    <>
      <li className="flex items-center gap-1 text-lg" onClick={toggleDropdown}>
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
        <ul className="flex flex-col items-center gap-1">
          {generateListItem()}
        </ul>
      )}
    </>
  );
}
