"use client";
import React, { useState } from "react";

import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export default function Page() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {!showSignIn ? (
        <SignInForm showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      ) : (
        <SignUpForm />
      )}
    </>
  );
}
