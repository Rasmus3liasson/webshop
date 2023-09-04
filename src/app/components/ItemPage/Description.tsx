import { cartContext } from "@/app/utils/cartContext";
import { sizeComparator } from "@/app/utils/functions/sortSizes";
import { CartItemInterface } from "@/types/cart";
import { uniqueItemInterface } from "@/types/uniqueItem";
import React, { useContext, useEffect, useState } from "react";

export default function Description({
  itemData,
}: {
  itemData: uniqueItemInterface;
}) {
  const { cart, setCart } = useContext(cartContext);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(
    itemData.clothingSizes.sort(sizeComparator)[0]
  );

  // Load cart data from sessionStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartFromStorage = sessionStorage.getItem("cart");
      if (cartFromStorage) {
        setCart(JSON.parse(cartFromStorage));
      }
    }
  }, [setCart]);

  const renderOptions = () => {
    return itemData.clothingSizes.sort(sizeComparator).map((itemSize) => {
      return (
        <option key={itemSize} value={itemSize}>
          {itemSize}
        </option>
      );
    });
  };

  const addToCart = () => {
    const newItemToCart = {
      title: itemData.name,
      imageUrl: itemData.galleryImages[0].url,
      size: size,
      quantity: quantity,
      price: itemData.price * quantity,
    };

    // Setting a default value for the array when it's empty
    const removesExistingItems: CartItemInterface[] = (cart ?? []).filter(
      (item) =>
        !(
          item.title === newItemToCart.title && item.size === newItemToCart.size
        )
    );

    const updatedCart = [newItemToCart, ...removesExistingItems];
    setCart(updatedCart);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center md:scale-125">
      <div className="mt-2">
        <p>{itemData.name}</p>
        <p className="font-semibold">{itemData.price}</p>
      </div>
      <div>
        <label>Storlek:</label>
        <select onChange={(e) => setSize(e.target.value)} name="size of item">
          Storlek
          {renderOptions()}
        </select>
      </div>
      <div>
        <label>Antal:</label>

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
            max={10}
            value={Number(quantity)}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
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
        onClick={addToCart}
        className="bg-green text-white p-3 rounded-full mt-5 hover:scale-102 hover:opacity-90 shadow-lg
        "
      >
        Lägg till i varukorg +
      </button>
    </div>
  );
}
