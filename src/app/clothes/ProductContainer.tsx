"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function ProductContainer() {
  const testArr = [
    "hej",
    "majs",
    "tempo",
    "thomas",
    "mask",
    "hejsaan",
    "majs",
    "nicklas",
    "jdjkaslj",
    "hej",
    "majs",
    "tempo",
    "thomas",
    "mask",
    "hejsaan",
    "majs",
    "nicklas",
    "jdjkaslj",
  ];

  //start value of state
  const [productItems, setProductItems] = useState(testArr.slice(0, 6));

  // adding items
  const handleShowMore = () => {
    const moreItemsAdded = productItems.length + 2;
    setProductItems(testArr.slice(0, moreItemsAdded));
  };
  return (
    <section className="mt-4 w-3/4">
      <div className="border-b-2 border-greyLight ">
        <p className="mb-4">Jackor</p>
      </div>
      <div className="flex gap-1 justify-center items-center flex-col">
        <div className="mt-2 bg-greyLight w-full text-center p-1">
          <span>{productItems.length}</span>
          <span>/</span>
          <span>{testArr.length}</span>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 ">
            {productItems.map((product, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <Image
                    src={"/dummy.jpeg"}
                    alt={product}
                    width={200}
                    height={200}
                  />

                  <div>
                    <p>{product}</p>
                    <p className="text-greyLight">brand</p>
                    <p>price</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {testArr.length > productItems.length ? (
          <button onClick={handleShowMore}>Show More</button>
        ) : null}
      </div>
    </section>
  );
}
