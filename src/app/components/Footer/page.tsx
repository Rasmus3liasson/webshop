import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-grey w-full text-white p-4 mt-auto">
      <div className="flex justify-evenly items-center flex-col lg:flex-row my-10">
        <div className="flex gap-10">
          <div className="flex items-center justify-center border text-center rounded-lg mx-2 w-28">
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
          <div className="flex items-center justify-center border text-center rounded-lg mx-2 w-28">
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
          <div className="flex items-center justify-center border text-center rounded-lg mx-2 w-28">
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
        <div className="mt-5">
          <p>Become a Member</p>
          <input
            type="text"
            placeholder="Your email"
            className="rounded-lg pl-2 p-1 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center text-sm text-gray-400">
        <p>&copy; Rasmus Eliasson. </p>
      </div>
    </div>
  );
}
