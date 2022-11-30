import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_SERVER_URL,
});

client.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
  "access-token"
)}`;

export default client;
