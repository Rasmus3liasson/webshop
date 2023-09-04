import firebase_app from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  AuthError,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(
  name: string,
  email: string,
  password: string
) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);

    //adding a name to the user
    if (result.user) {
      await updateProfile(result.user, {
        displayName: name,
      });
    }

    console.log("Ny användare skapad");
  } catch (error) {
    const authError = error as AuthError;

    authError.code === "auth/email-already-in-use" &&
      console.log("Användaren finns redan");

    error = authError;
  }

  return { result, error };
}
