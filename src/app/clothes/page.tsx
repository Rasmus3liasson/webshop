"use client";

import React, { Suspense, useEffect, useState } from "react";
import ProductContainer from "./ProductContainer";
import FilterAside from "./FilterAside";
import { FilteredItemDataInterface } from "@/types/items";

export default function Clothes() {
  const [productItems, setProductItems] = useState<FilteredItemDataInterface[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await fetch("/api/items");
        const data = await itemData.json();
        /* setProductItems(data.productItems.slice(0, 8)); */

        setProductItems(data);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="flex justify-between">
        <FilterAside />
        <ProductContainer productitems={productItems} />
      </section>
    </>
  );
}
