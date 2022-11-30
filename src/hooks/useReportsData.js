import { useQuery } from "@tanstack/react-query";
import client from "../api";

const useReportsData = (uid, onSuccess, onError) =>
  useQuery({
    queryKey: ["reports"],
    queryFn: async () => await (await client.get("/reports")).data,
    onSuccess,
    onError,
    enabled: uid ? true : false,
  });

export default useReportsData;
