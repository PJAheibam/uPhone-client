import client from "../api";

export function getUserRole(userId) {
  return client.get(`/user-role?uid=${userId}`);
}
