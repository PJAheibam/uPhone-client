import { createContext, useContext, useEffect, useState } from "react";
import client from "../api";
import { useAuth } from "./AuthContext";

const UserRoleContext = createContext();

function UserRoleProvider({ children }) {
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log(
    "🚀 ~ file: UserRoleContext.jsx ~ line 11 ~ UserRoleProvider ~ user",
    user?.displayName
  );

  // useEffect(() => {
  //   if (user.uid) {
  //     setLoading(true);
  //     client
  //       .get(`/user-role?uid=${user.uid}`, {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //         },
  //       })
  //       .then((res) => setRole(res.data.role))
  //       .catch((err) => console.error(err))
  //       .finally(() => setLoading(false));
  //   }
  // }, [user.uid]);

  return (
    <UserRoleContext.Provider value={{ role, loading }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);

export default UserRoleProvider;
