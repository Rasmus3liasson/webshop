"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";
import Declined from "./Declined";
import Success from "./Success";

export default function Page() {
  return (
    <Suspense fallback={<Loading/>}> 
      <Content />
    </Suspense>
  );
}

function Content() { 
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