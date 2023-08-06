"use client";
import React, { useState } from "react";
import signUp from "@/app/utils/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import PasswordValidation from "./input/PasswordValidation";
import EmailValidation from "./input/EmailValidation";

export interface ErrorState {
  email: boolean;
  password: boolean;
}

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorBorder, setErrorBorder] = useState<ErrorState>({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    setErrorBorder({
      email: !email,
      password: false,
    });

    if (error) {
      console.log("Couldn't create account because of " + error);
      if (email || password === "") {
        alert("Du kan inte lämna fälten tomma");
      }
      return;
    }

    console.log(result?.user);

    router.push("/login");
  };

  console.log(email === "");

  return (
    <div className="bg-white shadow-lg rounded-3xl py-16 md:p-14 w-5/6 my-28">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-semibold">Skapa konto</h1>
        </div>

        <form onSubmit={handleForm}>
          <div className="py-8 text-grey sm:text-lg sm:leading-7">
            <div className="flex flex-col md:flex-row items-center justify-center gap-7">
              <EmailValidation
                email={email}
                setEmail={setEmail}
                errorBorder={errorBorder}
              />
              <PasswordValidation
                errorBorder={errorBorder}
                password={password}
                setPassword={setPassword}
              />
            </div>
            <div className="flex flex-col items-center mt-7">
              <div className="relative">
                <button type="submit" className="button-primary">
                  Skapa
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
