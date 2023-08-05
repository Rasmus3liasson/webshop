"use client";
import React, { useState } from "react";
import signIn from "../utils/firebase/auth/signIn";
import signOutFromAccount from "../utils/firebase/auth/signOut";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  /*   const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result?.user.accessToken);
     return router.push("/admin");  
  }; */
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-30">Sign up</h1>
        <form /* onSubmit={handleForm} */>
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
            />
          </label>
          <div>
            <button className="button-primary" type="submit">
              Sign up
            </button>
          </div>
        </form>
        <div>
          <button onClick={signOutFromAccount}>hejhjeh</button>
        </div>
      </div>
      <div></div>
    </>
  );
}
