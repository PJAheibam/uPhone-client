import { toast } from "react-hot-toast";
import { client } from "../api";

async function verifyUser(user) {
  const toastId = toast.loading("Updating");
  try {
    const res = await client.patch(`/users/${user.uid}?uid=${admin.uid}`, {
      verified: true,
    });
    toast.success("User is verified", { id: toastId });
  } catch (err) {
    toast.error("Error while updating", { id: toastId });
  } finally {
    toast.dismiss(toastId);
  }
}
