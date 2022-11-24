import client from "./index";

export function addUser(user) {
  return client.post("/users", user);
}
