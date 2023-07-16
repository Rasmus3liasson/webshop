"use client";

import React from "react";
import ImageContainer from "@/app/components/ItemPage/ImageContainer";
import Description from "@/app/components/ItemPage/Description";
import { itemsMock } from "../../../../mockData/items";

export default function SpecificItem() {
  const data = itemsMock;

  console.log(data);

  return (
    <>
      <section className="bg-greyLighter mx-2 py-6 flex flex-col md:flex-row justify-evenly mt-9">
        <ImageContainer />
        <Description />
      </section>
    </>
  );
}
