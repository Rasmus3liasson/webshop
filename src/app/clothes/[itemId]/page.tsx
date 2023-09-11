"use client";

import React, { useEffect, useState } from "react";
import ImageContainer from "./components/ImageContainer";
import Description from "./components/Description";
import { uniqueItemMock } from "../../../../mockData/uniqueItemMock";
import { uniqueItemInterface } from "@/types/uniqueItem";
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
        const itemData = await fetch(`/api/items/${itemId}`);
        const data = await itemData.json();
        setProductItems(data);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (isLoading) {
    return <Loading />;
  }

  const data = productItems || uniqueItemMock[0];
  const itemImages = data.galleryImages || [];

  return (
    <>
      <section className="mx-2 py-6 flex flex-col md:flex-row justify-evenly my-9 lg:gap-20 md:gap-11">
        <ImageContainer images={itemImages} />
        <Description itemData={data} />
      </section>
    </>
  );
}
