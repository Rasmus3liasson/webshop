import React from "react";

export default function ProductContainer() {
  return (
    <div className="mx-5 my-16 md:my-24 sm:grid grid-cols-3 gap-5 space-y-4 md:space-y-0 justify-items-center md:mx-5">
      <div className="text-center bg-white shadow-lg ">
        <div className="px-7 py-9">
          <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-3xl">
            Popular items
          </h2>
          <p>Bild av plagget</p>
          <button type="button" className="button-primary">
            purchase now
          </button>
        </div>

        {/* image */}
      </div>

      <div className="text-center bg-white shadow-lg ">
        <div className="px-7 py-9">
          <h2 className="font-bold text-lg mb-2 md:mb-4 md:text-3xl">
            Popular items
          </h2>
          <p>Bild av plagget</p>
          <button type="button" className="button-primary">
            purchase now
          </button>
        </div>

        {/* image */}
      </div>

      <div className="text-center bg-white shadow-lg md:max-w-sm">
        <div className="px-7 py-9">
          <h2 className="font-bold text-lg mb-2 md:text-3xl">Popular items</h2>
          <p>Bild av plagget</p>
          <button type="button" className="button-primary">
            purchase now
          </button>
        </div>

        {/* image */}
      </div>
    </div>
  );
}
