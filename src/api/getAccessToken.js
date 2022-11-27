import axios from "axios";

export function getAccessToken(user) {
  const url = process.env.REACT_APP_LOCAL_SERVER_URL + "/get-access-token";
  axios
    .post(url, user)
    .then((res) => {
      const accessToken = res.data.accessToken;
      localStorage.setItem("access-token", accessToken);
      console.info(user.email, accessToken);
    })
    .catch((err) => console.error(err));
}
