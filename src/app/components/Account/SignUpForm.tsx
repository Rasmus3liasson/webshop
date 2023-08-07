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
  const [name, setName] = useState("Rasmus");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorBorder, setErrorBorder] = useState<ErrorState>({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp(name, email, password);

    setErrorBorder({
      email: !email,
      password: false,
    });

    if (error) {
      console.log("Couldn't create account because of " + error);
      if (email || password || name === "") {
        alert("Du kan inte lämna fälten tomma");
      }
      return;
    }

    console.log(result?.user.displayName);
    router.push("/login");
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl py-16 md:p-14 w-5/6 my-28">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-semibold">Skapa konto</h1>
        </div>

        <form onSubmit={handleForm}>
          <div className="py-8 text-grey sm:text-lg sm:leading-7">
            <div>
              <div className="relative mb-6">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none"
                  placeholder="Email address"
                  type="text"
                />
                <label className="absolute left-0 -top-3.5 text-grey text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Namn
                </label>
              </div>
            </div>
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
