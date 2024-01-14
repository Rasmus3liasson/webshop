import { getAuth, signOut } from "firebase/auth";

export default function signOutFromAccount(setUser: (user: null) => void) {
  const auth = getAuth();

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
