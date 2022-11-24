import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import google from "../../assets/icons/google.svg";
import { useAuth } from "../../context/AuthContext";
function LoginWithGoogle({ innerText }) {
  const { logInWithGoogle } = useAuth();

  function handleClick() {
    logInWithGoogle()
      .then((res) => console.info(res.user))
      .catch((err) => console.error(err));
  }
  return (
    <Container
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
