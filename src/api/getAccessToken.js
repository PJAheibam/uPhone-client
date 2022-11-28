import axios from "axios";

export async function getAccessToken(user) {
  console.info("user", user);
  const url = process.env.REACT_APP_LOCAL_SERVER_URL + "/get-access-token";
  const res = await axios.post(url, user);
  const accessToken = res.data.accessToken;
  localStorage.setItem("access-token", accessToken);
  console.info(user.email, accessToken);
}
