import Link from "next/link";
import React from "react";

export default function CategoryList() {
  return (
    <div className="w-full">
      <ul className="flex flex-col justify-evenly items-center gap-3 animate-slideInNav md:flex-row md:absolute md:top-16 md:w-full md:left-0 ">
        <Link className="link-text" href={"/clothes/jackets"}>
          <li>Jackor</li>
        </Link>
        <Link className="link-text" href={"/clothes/shirts"}>
          <li>Skjortor</li>
        </Link>
        <Link className="link-text" href={"/clothes/t-shirts"}>
          <li>T-shirt</li>
        </Link>
        <Link className="link-text" href={"/clothes/pants"}>
          <li>Byxor</li>
        </Link>
        <Link className="link-text" href={"/clothes/jeans"}>
          <li>Jeans</li>
        </Link>
        <Link className="link-text" href={"/clothes/shoes"}>
          <li>Skor</li>
        </Link>
      </ul>
    </div>
  );
}
