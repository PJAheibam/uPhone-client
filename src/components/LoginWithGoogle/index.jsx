import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import google from "../../assets/icons/google.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../api/getAccessToken";
import { addUser } from "../../api/addUser";
function LoginWithGoogle({
  innerText,
  isSubmitting,
  setSubmitting,
  navigateTo,
}) {
  const { logInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      setSubmitting(true);
      const res = await logInWithGoogle();
      console.info(res);
      const currentUser = {
        uid: res.user.uid,
        email: res.user.email,
        fullName: res.user?.displayName,
        role: "buyer",
        profilePhoto: {
          title: res.user?.displayName || null,
          display_url: res.user?.photoURL || null,
          thumb_url: res.user?.photoURL || null,
          medium_url: res.user?.photoURL || null,
          delete_url: null,
        },
      };
      const addUserRes = await addUser(currentUser);

      getAccessToken({ uid: res.user?.uid, email: res.user?.email });

      navigate(navigateTo, { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Container
      disabled={isSubmitting}
      loading={isSubmitting ? "true" : undefined}
      type="button"
      variant="outlined"
      color="primary"
      onClick={handleClick}
    >
      <img width={25} src={google} alt="google icon" />
      <Text>{innerText || "Log in with google"}</Text>
    </Container>
  );
}

export default LoginWithGoogle;

const Container = styled(Button)`
  width: 100%;
`;
const Text = styled.span`
  text-align: center;
  color: inherit;
  width: 100%;
`;
