import React from "react";

export default function Declined() {
  return (
    <>
      <div className="flex flex-col items-center space-y-2">
        <svg
          className="border-4 border-grey rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          fill="#e50000"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            fill="red"
          ></path>{" "}
        </svg>

        <h1 className="text-3xl py-8 font-semibold text-center">
          Din betalning kunde <span className="underline">inte</span> genomföras
        </h1>
      </div>
    </>
  );
}
