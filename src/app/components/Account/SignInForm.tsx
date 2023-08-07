import React, { useContext, useState } from "react";
import signIn from "@/app/utils/firebase/auth/signIn";
import signOutFromAccount from "@/app/utils/firebase/auth/signOut";
import { useRouter } from "next/navigation";
import signInGoogle from "@/app/utils/firebase/auth/signInGoogle";
import Image from "next/image";
import { accountContext } from "@/app/utils/firebase/accountContext";

export default function SignInForm({
  showSignIn,
  setShowSignIn,
}: {
  showSignIn: boolean;
  setShowSignIn: (value: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(accountContext);

  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log("Couldn't create account because of " + error);
      if (email || password === "") {
        alert("Du kan inte lämna fälten tomma");
      }
      return;
    }
    console.log(result?.user.displayName);
  };
  const handleGoogleSignIn = async () => {
    const { result, error } = await signInGoogle();

    const accountData = {
      name: result?.user.displayName?.toUpperCase().split(" ")[0].toString(),
      email: result?.user.email,
      initialsImageUrl: result?.user.photoURL,
    };

    result && setUser(accountData);

    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-20 md:p-14 w-5/6 my-28">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-semibold">Logga in</h1>
        </div>

        <div className="py-8 text-grey sm:text-lg sm:leading-7">
          <form onSubmit={handleForm}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-9">
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:borer-rose-600"
                  placeholder="Email address"
                />
                <label className="absolute left-0 -top-3.5 text-grey text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                />
                <label className="absolute left-0 -top-3.5 text-grey text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Password
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center mt-7">
              <h3
                onClick={() => setShowSignIn(!showSignIn)}
                className="text-sm text-sky-600 active:scale-98 hover:text-sky-500 duration-100 underline"
              >
                Skapa ett konto
              </h3>
            </div>
            <div className="flex items-center justify-center flex-col md:flex-row gap-5">
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="button-primary md:w-32 flex items-center justify-center gap-4"
                >
                  <Image
                    className="md:w-9 md:h-7"
                    src={"google.svg"}
                    alt="google icon"
                    height={20}
                    width={20}
                  />
                </button>
              </div>
              <div className="relative">
                <button className="button-primary">Logga in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
