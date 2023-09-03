import { FilteredItemDataInterface } from "@/types/items";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { getItemsFromApi } from "@/app/utils/dataFromApi";

export default function ProductContainer() {
  const [items, setItems] = useState<FilteredItemDataInterface[]>([]);
  const [loading, setLoading] = useState(true);

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

  //only want 3 on the home page
  const randomOrderArr = items.sort((a, b) => 0.5 - Math.random());
  const products = randomOrderArr.slice(0, 3).map((item) => item);
  const router = useRouter();

  // when data load show skeleton
  if (loading) {
    return <Loading />;
  }

  const renderItemsHomePage = () => (
    <div className="mx-5 my-16 md:my-24 sm:grid grid-cols-3 gap-5 space-y-4 md:space-y-0 justify-items-center md:mx-5">
      {products.map((itemDetails, index: number) => (
        <div
          onClick={() => router.push(`/clothes/${itemDetails.id}`)}
          key={index}
          className="text-center shadow-lg image-hover"
        >
          <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
            <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-2xl max-w-3 px-2">
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

  return renderItemsHomePage();
}
