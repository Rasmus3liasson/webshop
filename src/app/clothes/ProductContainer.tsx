// fetching all items at once so don't overuse the free request im having for the api service

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilteredItemDataInterface } from "@/types/items";
import Loading from "./loading";

export default function ProductContainer({
  productitems,
}: {
  productitems: FilteredItemDataInterface[];
}) {
  // copy of the data so i can reset to the originaldata om getting
  const [itemData, setItemData] = useState<FilteredItemDataInterface[]>([
    ...productitems,
  ]);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const colorQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");

  // adding items
  const handleShowMore = () => {
    if (displayedItems + 8 <= itemData.length) {
      setDisplayedItems((prevCount) => prevCount + 8);
    } else {
      setDisplayedItems(itemData.length);
    }
  };

  //setting loading state
  useEffect(() => {
    if (productitems) {
      setLoading(true);
    }
  }, [productitems]);

  // Updating the state everytime the query changes or doesn't exist
  useEffect(() => {
    // No queries, display all items
    if (colorQuery === null && categoryQuery === null) {
      setItemData([...productitems]);
    } else {
      const filteredItems = productitems.filter((item) => {
        if (colorQuery && item.itemColor !== colorQuery) {
          return false;
        }
        if (categoryQuery && item.itemCategory !== categoryQuery) {
          return false;
        }
        return true;
      });

      setItemData(filteredItems);
    }
  }, [colorQuery, categoryQuery, productitems]);

  return (
    <section className="my-16 md:w-3/4 w-full">
      <div className="flex gap-1 justify-center items-center flex-col">
        <div className="mt-2 bg-greyLight w-full text-center p-1">
          <span>
            {displayedItems > itemData.length
              ? itemData.length
              : displayedItems}
          </span>
          <span>/</span>
          <span>{itemData.length}</span>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 ">
            {loading
              ? itemData.slice(0, displayedItems).map((product) => (
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
        {displayedItems !== itemData.length && (
          <button onClick={handleShowMore}>Show More</button>
        )}
      </div>
    </section>
  );
}
