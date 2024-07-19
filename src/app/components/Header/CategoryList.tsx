"use client";
import Link from "next/link";

import { filterOptionsMock } from "../../../../mockData/items";

export default function CategoryList({
  setListState: setListState,
  setNavActive: setNavActive,
}: {
  setListState: (newState: boolean) => void;
  setNavActive: (newState: boolean) => void;
}) {
  return (
    <>
      <ul className="flex flex-col justify-evenly items-center gap-3 animate-slideInNav md:flex-row md:absolute md:top-9 md:w-full md:left-0 w-full md:pt-5">
        {filterOptionsMock.categories.map((categories, index) => {
          return (
            <Link
              key={index}
              className="link-text"
              href={`/clothes?category=${categories}`}
            >
              <li
                onClick={() => {
                  setListState(false);
                  setNavActive(false);
                }}
              >
                {categories}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
