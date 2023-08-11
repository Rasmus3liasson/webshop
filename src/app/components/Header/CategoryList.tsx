import Link from "next/link";
import React, { useState } from "react";

import { filterOptionsMock } from "../../../../mockData/items";

export default function CategoryList() {
  return (
    <>
      <ul className="flex flex-col justify-evenly items-center gap-3 animate-slideInNav md:flex-row md:absolute md:top-16 md:w-full md:left-0 w-full ">
        {filterOptionsMock.categories.map((categories, index) => {
          return (
            <Link
              key={index}
              className="link-text"
              href={`/clothes?category=${categories}`}
            >
              <li>{categories}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
