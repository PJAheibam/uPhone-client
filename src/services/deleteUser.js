import client from "../api";
import { toast } from "react-hot-toast";

export const deleteUser = async (admin, userId) => {
  const toastId = toast.loading("Deleting...");
  try {
    const res = await client.delete(`/users/${userId}?uid=${admin.uid}`);
    toast.success("User Delete Successfull!", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("An error occur while deleting", { id: toastId });
  }
};
