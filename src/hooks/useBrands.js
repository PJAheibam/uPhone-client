import { useQuery } from "@tanstack/react-query";
import client from "../api";

export const useBrands = (onSuccess, onError) =>
  useQuery({
    queryKey: ["brands"],
    queryFn: async () => await (await client.get("/brands")).data,
    refetchOnMount: true,
    onSuccess,
    onError,
  });
