import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-greyLight w-full text-white p-4 mt-auto">
      <div className="my-4 text-3xl text-center lg:text-4xl">
        <p>Webshop</p>
      </div>
      <div className="flex justify-evenly items-center flex-col lg:flex-row my-9">
        <div className="flex gap-2 md:gap-6 lg:gap-10">
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/lock.png"}
                alt="lock image"
                width={30}
                height={30}
              />
              <p className="mt-2">Secure payments</p>
            </div>
          </div>
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/package.png"}
                alt="lock image"
                width={30}
                height={30}
              />
              <p className="mt-2">Free returns</p>
            </div>
          </div>
          <div className="footer-box">
            <div className="flex flex-col items-center p-4">
              <Image
                src={"/footer/truck.png"}
                alt="lock image"
                width={30}
                height={30}
              />
              <p className="mt-2">Free Shippment</p>
            </div>
          </div>
        </div>
        <div className="mt-5 lg:scale-110 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <p className="mb-2">Become a Member</p>
            <input
              type="text"
              placeholder="Your email"
              className="rounded-lg pl-2 p-1 text-sm shadow-md"
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <p className="text-xl">Samarbete med:</p>
            <ul className="flex items-center justify-center gap-3 flex-col lg:flex-row mt-2">
              <li>
                <Image
                  src={"/footer/postnord.svg"}
                  alt="postnord logotype"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <Image
                  src={"/footer/budbee.svg"}
                  alt="postnord logotype"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <Image
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
