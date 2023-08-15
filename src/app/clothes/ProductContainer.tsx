// fetching all items at once so don't overuse the free request im having for the api service

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilteredItemDataInterface } from "@/types/items";
import Loading from "./loading";

export default function ProductContainer() {
  const [productItems, setProductItems] = useState<FilteredItemDataInterface[]>(
    []
  );
  const [displayedItems, setDisplayedItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const colorQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await fetch("/api/items");
        const data = await itemData.json();
        /* setProductItems(data.productItems.slice(0, 8)); */
        setProductItems(data);
        setDisplayedItems(8);
        setLoading(true);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      }
    };

    fetchData();
  }, []);

  // adding items
  const handleShowMore = () => {
    if (displayedItems + 8 <= productItems.length) {
      setDisplayedItems((prevCount) => prevCount + 8);
    } else {
      setDisplayedItems(productItems.length);
    }
  };

  // Updating the state everytime the query changes or doesn't exist
  useEffect(() => {
    if (colorQuery && categoryQuery === null) {
      setProductItems(productItems.slice(0, 8));
    }
  }, [colorQuery, categoryQuery, productItems]);

  return (
    <section className="my-16 md:w-3/4 w-full">
      <div className="flex gap-1 justify-center items-center flex-col">
        <div className="mt-2 bg-greyLight w-full text-center p-1">
          <span>{displayedItems}</span>
          <span>/</span>
          <span>{productItems.length}</span>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 ">
            {loading
              ? productItems.slice(0, displayedItems).map((product) => (
                  <div className="flex flex-col items-center" key={product.id}>
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
                ))
              : [...new Array(displayedItems)].map(
                  (
                    _,
                    index //undercore for unused parameter
                  ) => <Loading key={index} />
                )}
          </div>
        </div>
        {displayedItems !== productItems.length && (
          <button onClick={handleShowMore}>Show More</button>
        )}
      </div>
    </section>
  );
}
