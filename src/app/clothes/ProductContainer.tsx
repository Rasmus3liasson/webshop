// fetching all items at once so don't overuse the free request im having for the api service

"use client";

import { FilteredItemDataInterface } from "@/types/items";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductContainer({
  productitems,
}: {
  productitems: FilteredItemDataInterface[];
}) {
  const [itemData, setItemData] = useState<FilteredItemDataInterface[]>([
    ...productitems,
  ]);
  const [displayedItems, setDisplayedItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const colorQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setDisplayedItems(10);
    } else if (width >= 1024) {
      setDisplayedItems(8);
    } else if (width >= 768) {
      setDisplayedItems(6);
    } else {
      setDisplayedItems(8);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShowMore = () => {
    setDisplayedItems((prevCount) => prevCount + 8);
  };

  useEffect(() => {
    if (productitems) {
      setLoading(true);
    }
  }, [productitems]);

  useEffect(() => {
    if (colorQuery === null && categoryQuery === null) {
      setItemData([...productitems]);
    } else {
      const filteredItems = productitems.filter((item) => {
        if (colorQuery && item.itemColor.text !== colorQuery) {
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
    <div className="my-16 md:w-3/4 w-full">
      <div className="flex gap-1 justify-center items-center flex-col">
        <div
          className={`mt-2 bg-greyLight text-center p-1 font-medium flex justify-center gap-1 ${
            itemData.length === 0 ? "w-5/6" : "w-full"
          } rounded-b-md`}
        >
          <span>
            {displayedItems > itemData.length
              ? itemData.length
              : displayedItems}
          </span>
          <span>/</span>
          <span>{itemData.length}</span>
        </div>
        <div
          className={`${
            itemData.length === 0
              ? "flex justify-center items-center h-96"
              : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-5 w-full"
          } `}
        >
          {loading && (
            <>
              {itemData.length === 0 ? (
                <p className="font-medium text-2xl pt-5">
                  Inga produkter hittades
                </p>
              ) : (
                itemData.slice(0, displayedItems).map((product) => (
                  <div
                    className="flex flex-col items-center justify-between gap-2 mb-2"
                    key={product.id}
                  >
                    <Link href={`/clothes/${product.id}`}>
                      <div className="relative shadow-sm">
                        <Image
                          src={product.imagePoster}
                          alt={"product poster image"}
                          width={200}
                          height={200}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-greyLight opacity-0 duration-150 hover:opacity-60 flex justify-center items-center">
                          <ul className="w-full h-full overflow-scroll scrollbar-hide p-4 grid grid-cols-2 place-items-center">
                            {product.clothingSizes.map((size, index) => (
                              <li
                                key={index}
                                className="text-xl hover:scale-102 font-medium"
                              >
                                {size
                                  .toString()
                                  .replaceAll("R", "")
                                  .split(",")
                                  .join(" ")}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Link>
                    <div className="h-full">
                      <p className="text-greyLight mt-1 flex">{product.name}</p>
                      <p>{product.price} $</p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        {itemData.length > displayedItems && (
          <button onClick={handleShowMore}>Visa mer</button>
        )}
      </div>
    </div>
  );
}
