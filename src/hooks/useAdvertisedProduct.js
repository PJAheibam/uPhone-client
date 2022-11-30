import { useQuery } from "@tanstack/react-query";
import client from "../api";

const useAdvertisedProduct = (onSuccess, onError) =>
  useQuery({
    queryKey: ["advertised-products"],
    queryFn: async () => await (await client.get("/ad-products")).data,
    onSuccess,
    onError,
  });

export default useAdvertisedProduct;
