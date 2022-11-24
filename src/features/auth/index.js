import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
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

const GoogleProvider = new GoogleAuthProvider();

export function logInWithGoogle() {
  return signInWithPopup(auth, GoogleProvider);
}

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
