"use client";

import React, { useEffect, useState } from "react";
import CategoryDropdown from "./filterDropdowns/categoryDropdown";
import Image from "next/image";
import SizeDropdown from "./filterDropdowns/SizeDropdown";
import ColorDropdown from "./filterDropdowns/ColorDropdown";
import Link from "next/link";

export default function FilterAside() {
  const [filterBtn, setFilterBtn] = useState(false);
  const [filterAlternativesData, setFilterAlternativesData] = useState([]);

  const toggleFilter = () => {
    setFilterBtn(!filterBtn);
  };

  useEffect(() => {
    const getFilterData = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();

      setFilterAlternativesData(data);
    };
    getFilterData();
  }, []);

  console.log(filterAlternativesData[0]);

  return (
    <aside className="flex flex-col items-center absolute top-5 right-4 md:relative w-1/4 mt-16 md:mt-12 ">
      <button
        className="font-semibold text-xl rounded-full p-2 flex items-center gap-1"
        onClick={toggleFilter}
      >
        Filtrera
        <Image
          className={`${filterBtn && "rotate-180 duration-100"}`}
          src={"/list/down-arrow.svg"}
          alt="arrow for list to show if dropdown is active"
          width={20}
          height={20}
        />
      </button>

      {filterBtn && (
        <ul className="flex flex-col items-center gap-2 bg-white p-7 rounded-lg">
          <CategoryDropdown />
          <SizeDropdown />
          <ColorDropdown filterData={filterAlternativesData} />
          {/* button to link to querystring to apply filters */}
          <Link href={"#"}>
            <button className="text-xl  flex items-center active:scale-95 duration-100">
              Applicera
            </button>
          </Link>
        </ul>
      )}
    </aside>
  );
}
