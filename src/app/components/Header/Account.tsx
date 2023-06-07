import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Account() {
  const [isActive, setIsActive] = useState(false);
  //temporarly state for account
  const [account, setAccount] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Image
        src={"/header/user.png"}
        alt="user icon"
        width={35}
        height={35}
        onClick={toggleDropdown}
      />

      {isActive && (
        <div className="rounded-lg bg-grey text-gray-200 absolute right-4 top-16 lg:top-20">
          <div className="flex flex-col items-center">
            <div>
              <p className="p-3">Name of user</p>
            </div>
            <div className="py-2">
              {!account ? (
                <Link className="link-text" href={"#"}>
                  Sign In
                </Link>
              ) : (
                <Link className="link-text" href={"#"}>
                  Sign Out
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
