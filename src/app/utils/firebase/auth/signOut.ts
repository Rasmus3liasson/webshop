import { getAuth, signOut } from "firebase/auth";

export default function signOutFromAccount(setUser: (user: null) => void) {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log("Sign out from account successfully");
      // Clear user data from local storage
      window.localStorage.removeItem("user");
      setUser(null);
    })
    .catch((error) => {
      console.log(error);
    });
}
