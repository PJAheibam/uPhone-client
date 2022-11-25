import axios from "axios";

const baseURL = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_API}`;

const imgAPI = axios.create({
  baseURL,
});

export default imgAPI;
