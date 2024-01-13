"use client";

import { FilteredItemDataInterface } from "@/types/items";
import { useEffect, useState } from "react";
import { getItemsFromApi } from "../utils/dataFromApi";
import FilterAside from "./FilterAside";
import ProductContainer from "./ProductContainer";
import Loading from "./loading";

export default function Clothes() {
  const [productItems, setProductItems] = useState<FilteredItemDataInterface[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItemsFromApi();
        setProductItems(data);
        setLoading(true);
      } catch (error) {
        console.error("Kunde inte hämta datan", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="flex justify-between">
        {loading ? (
          <>
            <FilterAside />
            <ProductContainer productitems={productItems} />
          </>
        ) : (
          <div>
            {Array.from({ length: 8 }, (_, index) => (
              <Loading key={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
