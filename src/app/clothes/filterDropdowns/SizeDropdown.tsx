import Image from "next/image";
import React, { useState } from "react";

export default function SizeDropdown() {
  const [size, setSize] = useState(false);
  const [activeList, setActiveList] = useState<boolean[]>([]);

  const toggleDropdown = () => {
    setSize(!size);
  };

  const toggleListActive = (index: number) => {
    const updatedList = [...activeList];
    updatedList[index] = !updatedList[index];

    setActiveList(updatedList);
  };

  return (
    <>
      <li className="text-lg flex items-center gap-1" onClick={toggleDropdown}>
        Storlek
        <Image
          className={`${size && "rotate-180 duration-100"}`}
          src={"/list/down-arrow.svg"}
          alt="arrow for list to show if dropdown is active"
          width={20}
          height={20}
        />
      </li>
      {size && (
        <ul className="flex flex-col gap-2 items-center">
          <li
            onClick={() => toggleListActive(0)}
            className={activeList[0] ? "font-semibold" : ""}
          >
            XS
          </li>
          <li
            onClick={() => toggleListActive(1)}
            className={activeList[1] ? "font-semibold" : ""}
          >
            S
          </li>
          <li
            onClick={() => toggleListActive(2)}
            className={activeList[2] ? "font-semibold" : ""}
          >
            M
          </li>
          <li
            onClick={() => toggleListActive(3)}
            className={activeList[3] ? "font-semibold" : ""}
          >
            L
          </li>
          <li
            onClick={() => toggleListActive(4)}
            className={activeList[4] ? "font-semibold" : ""}
          >
            XL
          </li>
        </ul>
      )}
    </>
  );
}
