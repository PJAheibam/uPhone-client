import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = process.env.REACT_APP_LOCAL_SERVER_URL;

const useReportsData = (uid, onSuccess, onError) =>
  useQuery({
    queryKey: ["reports"],
    queryFn: async () =>
      await (
        await axios.get(baseURL + "/reports", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
      ).data,
    onSuccess,
    onError,
    enabled: uid ? true : false,
  });

export default useReportsData;
