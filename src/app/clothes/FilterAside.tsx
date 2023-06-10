"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function FilterAside() {
  const pathName = usePathname();

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
    <aside className="flex flex-col items-center w-1/4 mt-16">
      <h3 className="font-semibold text-xl">Kategorier</h3>
      <div>
        <ul className="flex flex-col gap-4 mt-3">
          {generateListItem("/clothes/jackets", "Jackor")}
          {generateListItem("/clothes/shirts", "Skjortor")}
          {generateListItem("/clothes/t-shirts", "T-shirt")}
          {generateListItem("/clothes/pants", "Byxor")}
          {generateListItem("/clothes/jeans", "Jeans")}
          {generateListItem("/clothes/shoes", "Skor")}
        </ul>
      </div>
    </aside>
  );
}
