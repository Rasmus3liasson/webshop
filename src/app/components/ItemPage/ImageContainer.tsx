import { ItemImagesInterface } from "@/types/uniqueItem";

import Image from "next/image";
import React, { useRef, useState } from "react";

export default function ImageContainer({
  images,
}: {
  images: ItemImagesInterface[];
}) {
  const [activeImg, setActiveImg] = useState(images[0].url);

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
    const itemPostersArr = images.map((imageUrl) => imageUrl.url);

    return itemPostersArr.map((url, index) => (
      <li onClick={() => handleActiveImg(url)} key={index}>
        {/* setting a p tag because cant apply a width to the images */}
        <p className="w-24"></p>
        <Image
          className="w-24"
          src={url}
          alt="poster"
          width={200}
          height={200}
        />
      </li>
    ));
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        <Image src={activeImg} alt="selected image" width={300} height={300} />
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

        <ul
          className="flex gap-4 overflow-x-scroll my-9 w-96"
          ref={containerRef}
        >
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
