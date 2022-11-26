import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { getAccessToken } from "../api/getAccessToken";
import {
  auth,
  logIn,
  logOut,
  logInWithGoogle,
  register,
} from "../features/auth";

const AuthContext = createContext();

const initialUserInfo = {
  displayName: null,
  email: null,
  uid: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUserInfo);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getAccessToken({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(initialUserInfo);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  // console.info(user);

  const value = {
    setLoading,
    loading,
    user,
    logIn,
    logOut,
    logInWithGoogle,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
