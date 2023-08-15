import { FilteredItemDataInterface } from "@/types/items";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

export default function ProductContainer() {
  const [items, setItems] = useState<FilteredItemDataInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        /* setItems(data.productItems); */
        //the mocked data real api should have .productItem
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchItemData();
  }, []);

  //only want 3 on the home page
  const products = items.slice(0, 3).map((item) => item);
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
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-2xl max-w-3 mt-3">
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
