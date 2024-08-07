"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ColorDropdown from "./filterDropdowns/ColorDropdown";
import CategoryDropdown from "./filterDropdowns/categoryDropdown";

import { FilterOptionsInterface } from "@/types/filter";
import { usePathname } from "next/navigation";
import ActiveFilter from "./filterDropdowns/ActiveFilter";

export default function FilterAside() {
  const [filterBtn, setFilterBtn] = useState(false);
  const [filterAlternativesData, setFilterAlternativesData] =
    useState<FilterOptionsInterface>({ color: [], categories: [] });
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const pathname = usePathname();

  const toggleFilter = () => {
    setFilterBtn(!filterBtn);
  };

  useEffect(() => {
    const fetchData = async () => {
      const filterData = await fetch("/api/items");
      const res = await filterData.json();

      setFilterAlternativesData(res.filterOptions);
    };

    fetchData();
  }, []);

  //Creates a queryString based on a the filters applied
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams();

    if (colorFilter.length > 0) {
      params.set("color", colorFilter.join(" "));
    }

    if (categoryFilter.length > 0) {
      params.set("category", categoryFilter.join(" "));
    }

    return params.toString();
  }, [colorFilter, categoryFilter]);

  return (
    <aside className="flex flex-col items-center absolute top-5 right-4 md:relative w-1/4 mt-16 md:mt-12 z-10 ">
      <button
        className="font-semibold text-xl rounded-full p-2 flex items-center gap-1"
        onClick={toggleFilter}
      >
        Filtrera
        <Image
          className={`${filterBtn && "rotate-180 duration-100"} ml-0.5`}
          src={"/list/down-arrow.svg"}
          alt="arrow for list to show if dropdown is active"
          width={20}
          height={20}
        />
      </button>

      {filterBtn && (
        <ul className="flex flex-col items-center gap-2 bg-white p-7 rounded-lg">
          <CategoryDropdown
            filterData={filterAlternativesData}
            setCategoryFilter={setCategoryFilter}
          />
          <ColorDropdown
            filterData={filterAlternativesData}
            setColorFilter={setColorFilter}
          />

          <>
            <ActiveFilter
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </>

          {/* button to link to querystring to apply filters */}
          <Link href={pathname + "?" + createQueryString()}>
            <button className="text-xl flex items-center active:scale-95 duration-100 bg-lightBlue rounded-full py-1 px-3 mt-3 hover:opacity-90 active:opacity-100 shadow-lg">
              Applicera
            </button>
          </Link>
        </ul>
      )}
    </aside>
  );
}
