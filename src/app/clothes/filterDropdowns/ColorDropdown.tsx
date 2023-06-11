import Image from "next/image";
import React, { useState } from "react";

export default function ColorDropdown() {
  const [color, setColor] = useState(false);
  const [activeListArr, setActiveListArr] = useState<boolean[]>([]);

  const toggleDropdown = () => {
    setColor(!color);
  };

  // toggle state of a list item at the index
  const toggleActiveList = (index: number) => {
    const updatedItems = [...activeListArr];
    updatedItems[index] = !updatedItems[index];

    setActiveListArr(updatedItems);
  };

  const colorCircle = (bgColor: string, textColor: string, index: number) => {
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
  };

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
        <ul className="flex flex-col gap-2">
          {colorCircle("bg-white", "vit", 0)}
          {colorCircle("bg-black", "svart", 1)}
          {colorCircle("bg-grey", "grå", 2)}
          {colorCircle("bg-blue-500", "blå", 3)}
          {colorCircle("bg-green-500", "grön", 4)}
          {colorCircle("bg-orange-200", "beige", 5)}
          {colorCircle("bg-red-500", "röd", 6)}
          {colorCircle("bg-yellow-200", "gul", 7)}
        </ul>
      )}
    </>
  );
}
