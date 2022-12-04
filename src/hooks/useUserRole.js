import { useQuery } from "@tanstack/react-query";
import client from "../api";

export const useUserRole = (userId, onSuccess = () => {}, onError = () => {}) =>
  useQuery({
    queryKey: ["user-role", userId],
    queryFn: async () => {
      const res = await client(`/user-role?uid=${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      // console.info("uid", userId);
      return res.data;
    },
    enabled: userId ? true : false,
    onSuccess,
    onError,
    refetchOnMount: true,
  });

export default useUserRole;
