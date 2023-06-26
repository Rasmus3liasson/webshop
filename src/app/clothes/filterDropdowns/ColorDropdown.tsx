import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ColorDropdown({ filterData }: { filterData: any }) {
  const [color, setColor] = useState(false);

  const searchParam = useSearchParams();
  const queryStringColor = searchParam.get("color");

  const toggleDropdown = () => {
    setColor(!color);
  };

  const generateListItem = () => {
    const colorsArr = filterData[0].values.map((colors) => colors.code);
    const colorsList = colorsArr.map((colors: string, index: number) => {
      const isActive = queryStringColor?.includes(colors);
      const className = `link-text ${isActive ? "underline" : ""}`;
      return (
        <Link className={className} href={"#"}>
          <li key={index}>{colors.toUpperCase()}</li>
        </Link>
      );
    });

    return colorsList;
  };

  /*   const colorCircle = (bgColor: string, textColor: string, index: number) => {
    return (
      <li
        key={index}
        onClick={() => toggleActiveList(index)}
        className={`flex gap-2 ${activeListArr[index] && "underline"}`}
      >
        {textColor.toUpperCase()}
        <div
          className={`${bgColor} w-5 h-5 rounded-full border-2 bg border-greyLight`}
        ></div>
      </li>
    );
  }; */

  return (
    <>
      <li className="text-lg flex items-center gap-1" onClick={toggleDropdown}>
        Färg{" "}
        <Image
          className={`${color && "rotate-180 duration-100"}`}
          src={"/list/down-arrow.svg"}
          alt="arrow for list to show if dropdown is active"
          width={20}
          height={20}
        />
      </li>
      {color && (
        <ul className="flex flex-col items-center gap-2">
          {generateListItem()}
        </ul>
      )}
    </>
  );
}
