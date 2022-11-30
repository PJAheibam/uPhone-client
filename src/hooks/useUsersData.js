import { useQuery } from "@tanstack/react-query";
import client from "../api";

const useUsersData = (uid, role, onSuccess, onError) =>
  useQuery({
    queryKey: ["users", role],
    queryFn: async () => {
      const url = `/users?uid=${uid}&role=${role}`;
      const res = await client.get(url);
      return res.data;
    },
    enabled: uid ? true : false,
    onSuccess,
    onError,
  });

export default useUsersData;
