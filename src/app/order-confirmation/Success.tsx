import React from "react";

export default function Success() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-28 h-28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#99ff99"
        strokeWidth="1"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl py-8 font-semibold text-center">
        Tack för din beställning
      </h1>
    </div>
  );
}
