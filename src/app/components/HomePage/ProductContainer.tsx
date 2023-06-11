import Image from "next/image";
import React from "react";

export default function ProductContainer({ items }) {
  //only want 3 on the home page
  const products = items.slice(0, 3).map((item) => item);

  const renderItemsHomePage = () => (
    <div className="mx-5 my-16 md:my-24 sm:grid grid-cols-3 gap-5 space-y-4 md:space-y-0 justify-items-center md:mx-5">
      {products.map((itemDetails, index: number) => (
        <div key={index} className="text-center bg-white shadow-lg">
          <div className="px-7 py-9">
            <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-3xl">
              {itemDetails.name}
            </h2>
            <p>Bild av plagget</p>
            <button type="button" className="button-primary">
              purchase now
            </button>
          </div>
          <Image
            src={itemDetails.imagePoster}
            alt="image of product"
            width={40}
            height={40}
          />
        </div>
      ))}
    </div>
  );

  return renderItemsHomePage();
}
