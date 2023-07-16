import { FilteredDataInterface } from "@/types/filter";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { handleFilterSettings } from "@/app/utils/functions/filterArray";

export default function ColorDropdown({
  filterData,
  setColorFilter: setColorFilter,
}: {
  filterData: any;
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
    const colorsList = colorsArr.map((colorCode: string, index: number) => {
      const isActive = queryStringColor?.includes(colorCode);
      const className = `link-text ${isActive ? "hidden" : ""}`;

      // Find colorCode that match name
      const colorCodeObj = colorsArr.find((color) => color === colorCode);

      const colorName = colorCodeObj ? colorCodeObj : null;

      console.log(colorName);
      console.log(colorCodeObj);

      // doesn't render out the color if it doesn't match the name
      if (!colorName) {
        return null;
      }

      return (
        <li
          onClick={() => handleFilterSettings(colorName, setColorFilter)}
          key={index}
          className={`flex justify-center items-center gap-2 ${className}`}
        >
          <p>{colorCode}</p>
          <span
            style={{ background: "#A52A2A" }}
            className="w-5 h-5 rounded-full opacity-80 border-2 border-grey"
          ></span>
        </li>
      );
    });

    return colorsList;
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
        <ul className="flex flex-col items-center gap-2">
          {generateListItem()}
        </ul>
      )}
    </>
  );
}
