"use client";

import React from "react";
import ImageContainer from "@/app/components/ItemPage/ImageContainer";
import Description from "@/app/components/ItemPage/Description";

export default function SpecificItem() {
  return (
    <>
      <section className="bg-greyLighter mx-2 py-6 flex flex-col md:flex-row justify-evenly mt-9">
        <ImageContainer />
        <Description />
      </section>
    </>
  );
}
