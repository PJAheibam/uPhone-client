import axios from "axios";
/*
 * http://localhost:5000
 * https://uphone-pjaheibam.vercel.app
 */
const client = axios.create({
  baseURL: "https://uphone-pjaheibam.vercel.app",
});

client.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
  "access-token"
)}`;

export default client;
