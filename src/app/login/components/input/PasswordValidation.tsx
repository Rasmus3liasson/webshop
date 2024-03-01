"use client";

import { ErrorState } from "../SignUpForm";

export default function passwordValidation({
  errorBorder,
  password,
  setPassword,
}: {
  errorBorder: ErrorState;
  password: string;
  setPassword: (newValue: string) => void;
}) {
  const calculatePasswordStrength = (password: string) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const minLength = 6;

    let strength = 0;
    if (password.match(uppercaseRegex)) strength += 1;
    if (password.match(numberRegex)) strength += 1;
    if (password.length >= minLength) strength += 1;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const progressBarWidth = (passwordStrength / 3) * 100;

  //divide the progressbar length by conditions
  return (
    <div className="relative">
      <input
        onChange={(e) => setPassword(e.target.value)}
        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none ${
          errorBorder.password && "border-red-600"
        }`}
        placeholder="Password"
        type="password"
      />
      {password && (
        <div
          className={`absolute left-0 bottom-0 h-1 ${
            progressBarWidth === 100 ? "bg-green" : "bg-red-600"
          }`}
          style={{ width: `${progressBarWidth}%` }}
        />
      )}
      <label className="absolute left-0 -top-3.5 text-grey text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
        Lösenord
      </label>
    </div>
  );
}
