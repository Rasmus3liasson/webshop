import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-greyLight w-full text-white p-4 mt-auto rounded-t-2xl">
      <div className="my-4 text-3xl text-center lg:text-4xl">
        <p>Webshop</p>
      </div>
      <div className="flex justify-evenly items-center flex-col lg:flex-row my-9">
        <div className="flex gap-2 md:gap-6 lg:gap-10">
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/payment.svg"}
                alt="lock image"
                width={60}
                height={60}
              />
              <p className="mt-2">Säkra betalningar</p>
            </div>
          </div>
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/return.svg"}
                alt="lock image"
                width={60}
                height={60}
              />
              <p className="mt-2">Gratis returer</p>
            </div>
          </div>
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/shipping.svg"}
                alt="lock image"
                width={60}
                height={60}
              />
              <p className="mt-2">Fri frakt</p>
            </div>
          </div>
        </div>
        <div className="mt-5 lg:scale-110 flex flex-col items-center">
          <div className="flex flex-col items-center mt-5">
            <p className="text-xl">Samarbete med:</p>
            <ul className="flex items-center justify-center gap-3 flex-col lg:flex-row mt-2">
              <li>
                <Image
                  className="w-auto h-auto"
                  src={"/footer/postnord.svg"}
                  alt="postnord logotype"
                  width={80}
                  height={80}
                  priority={true}
                />
              </li>
              <li>
                <Image
                  className="w-auto h-auto"
                  src={"/footer/budbee.svg"}
                  alt="postnord logotype"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <Image
                  className="w-auto h-auto"
                  src={"/footer/klarna.svg"}
                  alt="postnord logotype"
                  width={80}
                  height={80}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center text-sm text-greyLight">
        <p>&copy; Rasmus Eliasson. </p>
      </div>
    </div>
  );
}
