"use client";

import Link from "next/link";
import React from "react";

export default function CartItems() {
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24"
            src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">Title</span>

          <span className="font-semibold hover:text-red-500 text-gray-500 text-xs">
            Ta bort
          </span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <span className="text-center w-1/5 font-semibold text-sm">Antal</span>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">400</span>
      <span className="text-center w-1/5 font-semibold text-sm">400</span>
    </div>
  );
}
