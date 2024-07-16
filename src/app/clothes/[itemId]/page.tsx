"use client";

import { uniqueItemInterface } from "@/types/uniqueItem";
import { useEffect, useState } from "react";
import { uniqueItemMock } from "../../../../mockData/uniqueItemMock";
import Description from "./components/Description";
import ImageContainer from "./components/ImageContainer";
import Loading from "./loading";

export default function SpecificItem({
  params,
}: {
  params: { itemId: string };
}) {
  const { itemId } = params;
  const [productItems, setProductItems] = useState<
    uniqueItemInterface | undefined
  >();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await fetch(`/api/items/${itemId}` );
        const data = await itemData.json();
        setProductItems((data as uniqueItemInterface) || uniqueItemMock[0]);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (isLoading || !productItems) {
    return <Loading />;
  }

  const itemImages = (productItems && productItems?.galleryImages) || [];

  return (
    <>
      <section className="mx-2 py-6 flex flex-col md:flex-row justify-evenly my-9 lg:gap-20 md:gap-11">
        <ImageContainer images={itemImages} />
        {productItems && <Description itemData={productItems} />}
      </section>
    </>
  );
}
