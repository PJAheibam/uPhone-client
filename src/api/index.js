import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    autorization: `Bearer ${localStorage.getItem("access-token")}`,
  },
});

export default client;
