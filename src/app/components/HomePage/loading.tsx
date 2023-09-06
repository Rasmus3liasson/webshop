import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col md:flex-row gap:9 items-center w-3/4 gap-6 md:gap-12">
      {[...new Array(3)].map((_, index) => (
        // underscore to avoid undefiended in console
        <div
          key={index}
          className="mt-12 w-3/4 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 "
        >
          <div className="flex flex-col space-y-2">
            <div className="h-6 rounded-md bg-gray-300 "></div>
            <div className="h-52 w-full rounded-md bg-gray-300 "></div>
          </div>
        </div>
      ))}
    </div>
  );
}
