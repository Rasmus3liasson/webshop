import Link from "next/link";
import React from "react";

export default function CategoryList() {
  return (
    <div className="w-full">
      <ul className="flex flex-col justify-evenly items-center gap-3 animate-slideInNav md:flex-row md:absolute md:top-16 md:w-full md:left-0 ">
        <Link className="link-text" href={"/jackets"}>
          <li>Jackor</li>
        </Link>
        <Link className="link-text" href={"/shirts"}>
          <li>Skjortor</li>
        </Link>
        <Link className="link-text" href={"/t-shirts"}>
          <li>T-shirt</li>
        </Link>
        <Link className="link-text" href={"/pants"}>
          <li>Byxor</li>
        </Link>
        <Link className="link-text" href={"/jeans"}>
          <li>Jeans</li>
        </Link>
        <Link className="link-text" href={"/shoes"}>
          <li>Skor</li>
        </Link>
      </ul>
    </div>
  );
}
