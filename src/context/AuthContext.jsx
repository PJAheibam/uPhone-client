import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { auth, logIn, logOut, logInWithPopup } from "../features/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    displayName: null,
    email: null,
    uid: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { loading, user, logIn, logOut, logInWithPopup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
