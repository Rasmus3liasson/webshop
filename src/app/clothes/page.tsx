import React, { Suspense } from "react";
import ProductContainer from "./ProductContainer";
import FilterAside from "./FilterAside";

export default function Clothes() {
  return (
    <>
      <section className="flex justify-between">
        <FilterAside />
        <ProductContainer />
      </section>
    </>
  );
}
