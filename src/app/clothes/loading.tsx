import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-green-300">
      <div className="flex items-center justify-center ">
        <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
