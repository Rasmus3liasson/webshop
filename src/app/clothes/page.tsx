import Image from "next/image";
import React from "react";

export default function clothes() {
  const testArr: string[] = ["hej", "majs", "tempo", "thomas", "mask"];

  return (
    <section className="mt-4">
      <div className="border-b-2 border-greyLight ">
        <p className="mb-4">
          Jackor <span>Antalet produkter som finns</span>
        </p>
      </div>
      <div className="flex gap-1 justify-center items-center flex-col">
        <div className="mt-2 bg-greyLight w-full text-center p-1">
          <span>2</span>
          <span>/</span>
          <span>7</span>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-4 mt-5 w-2/4">
            {testArr.map((product, index) => {
              return (
                <div className="flex justify-center flex-col">
                  <Image
                    key={index}
                    src={"/dummy.jpeg"}
                    alt={product}
                    width={100}
                    height={200}
                  />

                  <div className="">
                    <p>{product}</p>
                    <p className="text-greyLight">brand</p>
                    <p>price</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
