import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../config";

export default function signOutFromAccount(setUser: (user: null) => void) {
  const auth = getAuth(firebase_app);

  signOut(auth)
    .then(() => {
      // Clear user data from local storage
      window.localStorage.removeItem("user");
      setUser(null);
    })
    .catch((error) => {
      console.log(error);
    });
}
