import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="hero-bg flex items-center justify-center text-center mt-10">
      <div className="bg-greyLight bg-opacity-50 w-50 text-white rounded-lg p-10 mx-9 lg:mx-0">
        <h1 className="font-bold text-2xl mb-2 md:mb-4 md:text-3xl">
          Välkommen
        </h1>

        <Link href={"/clothes"}>
          <button type="button" className="button-primary">
            Handla här
          </button>
        </Link>
      </div>
    </div>
  );
}
