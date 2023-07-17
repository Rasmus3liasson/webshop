"use client";

import React from "react";
import ImageContainer from "@/app/components/ItemPage/ImageContainer";
import Description from "@/app/components/ItemPage/Description";
import { uniqueItemMock } from "../../../../mockData/uniqueItemMock";

export default function SpecificItem() {
  const data = uniqueItemMock[0];

  const itemImages = data.galleryImages;

  return (
    <>
      <section className="bg-greyLighter mx-2 py-6 flex flex-col md:flex-row justify-evenly mt-9">
        <ImageContainer images={itemImages} />
        <Description itemData={data} />
      </section>
    </>
  );
}
