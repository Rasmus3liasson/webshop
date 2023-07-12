"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { itemsMock } from "../../../mockData/items";
import { filterItemsArray } from "../utils/functions/filterArray";
import { useSearchParams } from "next/navigation";

export default function ProductContainer() {
  const data = filterItemsArray(itemsMock);

  const searchParams = useSearchParams();

  const colorQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");

  //start value of state
  const [productItems, setProductItems] = useState(data.slice(0, 8));

  // adding items
  const handleShowMore = () => {
    const moreItemsAdded = productItems.length + 8;
    setProductItems(data.slice(0, moreItemsAdded));
  };

  // Updating the state everytime the query changes
  useEffect(() => {
    setProductItems(data);
  }, [colorQuery, categoryQuery]);

  console.log(productItems);
  return (
    <section className="mt-16 md:w-3/4 w-full">
      <div className="flex gap-1 justify-center items-center flex-col">
        <div className="mt-2 bg-greyLight w-full text-center p-1">
          <span>{productItems.length}</span>
          <span>/</span>
          <span>{data.length}</span>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 ">
            {productItems.map((product, index) => {
              return (
                <div className="flex flex-col items-center" key={index}>
                  <div className="relative">
                    <Image
                      src={product.imagePoster}
                      alt={"product poster image"}
                      width={200}
                      height={200}
                    />

                    {/* overlay for images */}
                    <div className="absolute top-0 left-0 w-full h-full bg-greyLight opacity-0 duration-150 hover:opacity-60">
                      <ul className="flex items-center justify-center absolute bottom-0 left-2/4 right-2/4">
                        <li className="">{product.clothingSizes}</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-greyLight">{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {data.length > productItems.length ? (
          <button onClick={handleShowMore}>Show More</button>
        ) : null}
      </div>
    </section>
  );
}
