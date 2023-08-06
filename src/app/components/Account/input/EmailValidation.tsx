"use client";

import React from "react";
import { ErrorState } from "../SignUpForm";

export default function EmailValidation({
  errorBorder,
  email,
  setEmail,
}: {
  errorBorder: ErrorState;
  email: string;
  setEmail: (newValue: string) => void;
}) {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailIsValid = validateEmail(email);
  const emailProgressBarWidth = emailIsValid ? 100 : 0;
  return (
    <div className="relative">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none ${
          errorBorder.email && "border-red-600"
        }`}
        placeholder="Email address"
      />
      {email && (
        <div
          className={`absolute left-0 bottom-0 h-1 ${
            emailProgressBarWidth === 100 ? "bg-green" : "bg-red-600"
          }`}
          style={{ width: `${emailProgressBarWidth}%` }}
        />
      )}
      <label className="absolute left-0 -top-3.5 text-grey text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
        Email Address
      </label>
    </div>
  );
}
