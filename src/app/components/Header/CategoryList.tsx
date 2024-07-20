"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function CategoryList({
  setListState: setListState,
  setNavActive: setNavActive,
}: {
  setListState: (newState: boolean) => void;
  setNavActive: (newState: boolean) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/items");
      const res = await data.json();
      setCategories(res.filterOptions.categories);
    };
    fetchData();
  }, []);
  return (
    <>
      <ul className="flex flex-col justify-evenly items-center gap-3 animate-slideInNav md:flex-row md:absolute md:top-9 md:w-full md:left-0 w-full md:pt-5">
        {categories.map((categories, index) => {
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
