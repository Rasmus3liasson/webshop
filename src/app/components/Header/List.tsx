"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function List() {
  const pathName = usePathname();

  return (
    <>
      <ul className="flex flex-col md:flex-row gap-7 lg:ml-36 md:gap-24 top-24 items-center md:m-0 mb-5">
        <li className={`link-text ${pathName === "/" && "underline"} `}>
          <Link href="/">Home</Link>
        </li>
        <li className={`link-text ${pathName === "/category" && "underline"} `}>
          <Link href="/">Category</Link>
        </li>
        <li className={`link-text ${pathName === "/about" && "underline"} `}>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </>
  );
}
