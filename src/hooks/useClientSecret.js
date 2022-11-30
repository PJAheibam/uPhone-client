import { useQuery } from "@tanstack/react-query";
import client from "../api";

const useClientSecret = (bookingId, price) =>
  useQuery({
    queryKey: ["clientSecret", bookingId],
    queryFn: async () =>
      await (
        await client.post("/create-payment-intent", { price })
      ).data,
    enabled: !!bookingId ? true : false,
  });

export default useClientSecret;
