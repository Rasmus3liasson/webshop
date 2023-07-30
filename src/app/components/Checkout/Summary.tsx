import React from "react";

export default function Summary() {
  return (
    <div className="md:w-1/4 w-full px-8 pb-10 flex items-center justify-center flex-col">
      <div className="mt-8 flex flex-col items-center justify-between">
        <div className=" py-6 text-lg font-semibold flex flex-col items-center">
          <span>Total kostnad</span>
          <span>600</span>
        </div>
        <button className="text-md bg-black text-white p-3 rounded-3xl">
          Checkout
        </button>
      </div>
    </div>
  );
}
