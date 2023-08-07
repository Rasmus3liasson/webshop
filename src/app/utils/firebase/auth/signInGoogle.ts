import firebase_app from "../config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);
const googleSignIn = new GoogleAuthProvider();

export default async function signInGoogle() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, googleSignIn);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
