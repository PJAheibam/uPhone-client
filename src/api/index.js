import axios from "axios";
/*
 * http://localhost:5000
 * https://uphone-pjaheibam.vercel.app
 */
const client = axios.create({
  baseURL: "http://localhost:5000",
});

client.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
  "access-token"
)}`;

export default client;
