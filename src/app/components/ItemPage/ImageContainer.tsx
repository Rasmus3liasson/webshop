import Image from "next/image";
import React, { useRef, useState } from "react";

export default function ImageContainer() {
  const [activeImg, setActiveImg] = useState("");

  const handleActiveImg = (e: string) => {
    setActiveImg(e);
  };

  const containerRef = useRef<HTMLUListElement>(null);

  const scrollToFirstItem = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToLastItem = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const allPosters = () => {
    const itemPostersArr = [
      "hej",
      "marcus",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
      "bild",
    ];
    const imgArr = [];

    for (let i = 0; i < itemPostersArr.length; i++) {
      imgArr.push(
        <li onClick={() => handleActiveImg(itemPostersArr[i])} key={i}>
          <h1>{itemPostersArr[i]}</h1>
        </li>
      );
    }

    return imgArr;
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        <h1>{activeImg}</h1>
      </div>
      <div className="flex gap-4">
        <button onClick={scrollToFirstItem} aria-roledescription="slide button">
          <Image
            className="rotate-90"
            src={"/list/down-arrow.svg"}
            alt="arrow button"
            height={20}
            width={20}
          />
        </button>
        <ul className="flex gap-4 w-72 overflow-x-scroll" ref={containerRef}>
          {allPosters()}
        </ul>
        <button onClick={scrollToLastItem} aria-roledescription="slide button">
          <Image
            className="-rotate-90"
            src={"/list/down-arrow.svg"}
            alt="arrow button"
            height={20}
            width={20}
          />
        </button>
      </div>
    </section>
  );
}
