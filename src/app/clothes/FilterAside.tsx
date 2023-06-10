"use client";

import React, { useState } from "react";
import CategoryDropdown from "./filterDropdowns/CategoryDropdown";
import Image from "next/image";
import SizeDropdown from "./filterDropdowns/SizeDropdown";
import ColorDropdown from "./filterDropdowns/ColorDropdown";
import Link from "next/link";

export default function FilterAside() {
  const [filterBtn, setFilterBtn] = useState(false);

  const toggleFilter = () => {
    setFilterBtn(!filterBtn);
  };

  return (
    <aside className="flex flex-col items-center w-1/4 mt-16">
      <button
        className="font-semibold text-xl bg-greyLight rounded-full p-2 flex items-center gap-1"
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
        <ul className="flex flex-col items-center gap-2 mt-3">
          <CategoryDropdown />
          <SizeDropdown />
          <ColorDropdown />
        </ul>
      )}

      {/* button to link to querystring to apply filters */}
      <Link href={"#"}>
        <button className="text-xl  flex items-center active:scale-95 duration-100">
          Applicera
        </button>
      </Link>
    </aside>
  );
}
