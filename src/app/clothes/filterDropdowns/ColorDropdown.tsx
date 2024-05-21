import { ColorOptions, FilterOptionsInterface } from "@/types/filter";
import Image from "next/image";

import { handleFilterSettings } from "@/app/utils/functions/filterArray";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ColorDropdown({
  filterData,
  setColorFilter: setColorFilter,
}: {
  filterData: FilterOptionsInterface;
  setColorFilter: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [color, setColor] = useState(false);

  const searchParam = useSearchParams();
  const queryStringColor = searchParam.get("color");

  const toggleDropdown = () => {
    setColor(!color);
  };

  const generateListItem = () => {
    const colorsArr = filterData.color;
    const colorsList = colorsArr.map(
      (colorObj: ColorOptions, index: number) => {
        const isActive = queryStringColor?.includes(colorObj.text);
        const className = `link-text ${isActive ? "hidden" : ""}`;

        return (
          <li
            onClick={() => handleFilterSettings(colorObj.text, setColorFilter)}
            key={index}
            className={`flex justify-center items-center gap-2 ${className}`}
          >
            <p className="w-20">{colorObj.text}</p>
            <span
              style={{ background: `#${colorObj.code}` }}
              className="w-5 h-5 rounded-full opacity-80 border-2 border-grey"
            ></span>
          </li>
        );
      }
    );

    return colorsList;
  };

  return (
    <>
      <li className="text-lg flex items-center gap-1" onClick={toggleDropdown}>
        Färg
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
