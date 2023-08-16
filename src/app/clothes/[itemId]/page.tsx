"use client";

import React, { useEffect, useState } from "react";
import ImageContainer from "@/app/components/ItemPage/ImageContainer";
import Description from "@/app/components/ItemPage/Description";
import { uniqueItemMock } from "../../../../mockData/uniqueItemMock";
import { uniqueItemInterface } from "@/types/uniqueItem";

export default function SpecificItem({
  params,
}: {
  params: { itemId: string };
}) {
  const { itemId } = params;
  const [productItems, setProductItems] = useState<
    uniqueItemInterface | undefined
  >();

  //setting up an loading state so my mocked data want appear before the async data im retrieving
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
  }, []);

  if (isLoading) {
    return <h1>Laddar...</h1>;
  }

  const data = productItems || uniqueItemMock[0];
  const itemImages = data.galleryImages || [];

  return (
    <>
      <section className="mx-2 py-6 flex flex-col md:flex-row justify-evenly my-9">
        <ImageContainer images={itemImages} />
        <Description itemData={data} />
      </section>
    </>
  );
}
