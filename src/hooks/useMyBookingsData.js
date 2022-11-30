import { useQuery } from "@tanstack/react-query";
import client from "../api";

export const useMyBookingsData = (
  uid,
  onSuccess = () => {},
  onError = () => {}
) =>
  useQuery({
    queryKey: ["my-bookings", uid],
    queryFn: async () => await (await client(`/bookings?uid=${uid}`)).data,
    onSuccess,
    onError,
  });

export default useMyBookingsData;
