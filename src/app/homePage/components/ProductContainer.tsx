"use client";
import { getItemsFromApi } from "@/app/utils/dataFromApi";
import { FilteredItemDataInterface } from "@/types/items";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function ProductContainer() {
  const [items, setItems] = useState<FilteredItemDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItemsFromApi();
        setItems(data);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  let products: FilteredItemDataInterface[] = [];
  //only want 3 on the home page
  // Check if items is not empty before sorting and slicing
  if (items && items.length > 0) {
    //only want 3 on the home page
    const randomOrderArr = items.sort((a, b) => 0.5 - Math.random());
    products = randomOrderArr.slice(0, 3).map((item) => item);
  }

  // when data load show skeleton
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-5 my-16 md:my-24 sm:grid grid-cols-3 gap-12 space-y-4 md:space-y-0 justify-items-center md:mx-5">
      {products.map((itemDetails, index: number) => (
        <div
          onClick={() => router.push(`/clothes/${itemDetails.id}`)}
          key={index}
          className="text-center shadow-lg image-hover rounded-md"
        >
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-2xl px-2">
              {itemDetails.name}
            </h2>

            <Image
              src={itemDetails.imagePoster}
              alt="image of product"
              width={300}
              height={300}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
