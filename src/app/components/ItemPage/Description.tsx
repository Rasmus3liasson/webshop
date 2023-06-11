import React, { useState } from "react";

export default function Description() {
  let quantityValue = 1;
  const [quantity, setQuantity] = useState(quantityValue);

  const sizeArr: string[] = ["small", "medium", "large"];

  const renderOptions = () => {
    return sizeArr.map((size) => {
      return (
        <option key={size} value={size}>
          {size}
        </option>
      );
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="mt-2">
        <p>Name of item</p>
        <p className="font-semibold">pricetag</p>
      </div>
      <div>
        <label htmlFor="">Storlek:</label>
        <select name="size of item">
          Storlek
          {renderOptions()}
        </select>
      </div>
      <div>
        <label htmlFor="">Antal:</label>

        <div>
          <span
            className="text-xl bg-slate-100"
            onClick={() => {
              if (quantity !== 1) {
                setQuantity((quantity) => quantity - 1);
              }
            }}
          >
            -
          </span>
          <input
            className="text-center pl-3 w-16"
            type="number"
            min={1}
            value={quantity}
          />
          <span
            className="text-xl bg-slate-100"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          >
            +
          </span>
        </div>
      </div>

      <button
        className="bg-green text-white p-3 rounded-full mt-5 hover:scale-102 hover:opacity-90
        "
      >
        Lägg till i varukorg +
      </button>
    </div>
  );
}
