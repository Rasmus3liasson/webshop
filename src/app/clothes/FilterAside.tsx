"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function FilterAside() {
  const pathName = usePathname();

  return (
    <aside className="flex flex-col items-center w-1/4 mt-16">
      <h3 className="font-semibold text-xl">Kategorier</h3>
      <div>
        <ul className="flex flex-col gap-4 mt-3">
          <Link
            className={`link-text ${
              pathName.includes("jackets") && "underline"
            }`}
            href={"/clothes/jackets"}
          >
            <li>Jackor</li>
          </Link>
          <Link
            className={`link-text ${
              pathName.includes("shirts") && "underline"
            }`}
            href={"/clothes/shirts"}
          >
            <li>Skjortor</li>
          </Link>
          <Link
            className={`link-text ${
              pathName.includes("t-shirts") && "underline"
            }`}
            href={"/clothes/t-shirts"}
          >
            <li>T-shirt</li>
          </Link>
          <Link
            className={`link-text ${pathName.includes("pants") && "underline"}`}
            href={"/clothes/pants"}
          >
            <li>Byxor</li>
          </Link>
          <Link
            className={`link-text ${pathName.includes("jeans") && "underline"}`}
            href={"/clothes/jeans"}
          >
            <li>Jeans</li>
          </Link>
          <Link
            className={`link-text ${pathName.includes("shoes") && "underline"}`}
            href={"/clothes/shoes"}
          >
            <li>Skor</li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}
