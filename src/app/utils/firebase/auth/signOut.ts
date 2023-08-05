import { getAuth, signOut } from "firebase/auth";

export default function signOutFromAccount() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sign out from account successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}
