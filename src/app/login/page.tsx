"use client";
import React, { useState } from "react";

import SignInForm from "../components/Account/SignInForm";
import SignUpForm from "../components/Account/SignUpForm";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {!showSignIn ? (
        <SignInForm showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      ) : (
        <SignUpForm setShowSignIn={setShowSignIn} />
      )}
    </>
  );
}
