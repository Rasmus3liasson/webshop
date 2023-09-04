"use client";
import { accountContext } from "@/app/utils/firebase/accountContext";
import signOutFromAccount from "@/app/utils/firebase/auth/signOut";
import { AccountContextInterface } from "@/types/account";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

export default function Account() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  // Clearing context if local storage doesn't exist
  const { user, setUser } = useContext(
    accountContext
  ) as AccountContextInterface;

  if (typeof window !== "undefined") {
    const localStorageAccount = window.localStorage.getItem("user");
    const dataFromLocalStorage =
      localStorageAccount !== null ? JSON.parse(localStorageAccount) : null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setUser(dataFromLocalStorage !== null ? dataFromLocalStorage : null);
    }, [dataFromLocalStorage, setUser]);
  }

  return (
    <>
      <div onClick={() => setIsActive(!isActive)}>
        {user ? (
          user.initialsImageUrl ? (
            <Image
              className="rounded-full"
              src={user.initialsImageUrl}
              alt="initial icon from google"
              width={30}
              height={30}
            />
          ) : (
            <div className="bg-initialIcon text-white rounded-full p-2 w-9 text-center">
              {user.name?.slice(0, 1).toLowerCase()}
            </div>
          )
        ) : (
          <Link href={"/login"}>
            <Image
              src={"/header/user.png"}
              alt="user icon"
              width={35}
              height={35}
            />
          </Link>
        )}
        {isActive && (
          <div className="text-black absolute right-10 lg:right-2 top-16 lg:top-20 hover:scale-102">
            <div className="flex flex-col items-center">
              <div className="py-2">
                {user && (
                  <p
                    onClick={() => {
                      signOutFromAccount(setUser);
                      router.refresh();
                    }}
                  >
                    Logga ut
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
