import { onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { getAccessToken } from "../api/getAccessToken";
import { auth, logIn, logInWithGoogle, register } from "../features/auth";

const AuthContext = createContext();

const initialUserInfo = {
  displayName: null,
  email: null,
  uid: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUserInfo);

  const [loading, setLoading] = useState(true);

  function logOut() {
    setLoading(true);
    signOut(auth)
      .then(() => localStorage.removeItem("access-token"))
      .catch((err) => console.info("Log Out Error:", err));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.info("current-user,", currentUser?.displayName);
      if (currentUser) {
        setUser(currentUser);
        // getAccessToken({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(initialUserInfo);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

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
