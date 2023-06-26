"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import ProductContainer from "./components/ProductContainer";
import { FilteredDataInterface } from "@/types/items";

export default function Page() {
  const [items, setItems] = useState<FilteredDataInterface[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <>
      <Hero />
      <ProductContainer items={items} />
    </>
  );
}
