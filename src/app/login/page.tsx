"use client";
import React, { useState } from "react";

import SignInForm from "../components/Account/SignInForm";
import SignUpForm from "../components/Account/SignUpForm";

export default function page() {
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
