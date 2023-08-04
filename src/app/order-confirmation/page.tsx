"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import Success from "./Success";
import Declined from "./Declined";

export default function page() {
  const params = useSearchParams();

  const query = params.get("status");

  return (
    <>
      <div className="flex flex-col items-center justify-center my-48">
        {query === "success" ? <Success /> : <Declined />}
        <>
          <Link href={"/"} className="button-primary">
            <span className="text-sm font-medium">
              Tillbaka till förstasida
            </span>
          </Link>
        </>
      </div>
    </>
  );
}
