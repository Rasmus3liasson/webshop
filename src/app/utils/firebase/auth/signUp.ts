import firebase_app from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
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
  } catch (e) {
    error = e;
  }

  return { result, error };
}
