import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export function logIn(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  signOut(auth)
    .then((res) => console.info("Log Out Res:", res))
    .catch((err) => console.info("Log Out Error:", err));
}

export function logInWithPopup(provider) {
  return signInWithPopup(auth, provider);
}
