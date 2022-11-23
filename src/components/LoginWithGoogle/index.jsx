import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import google from "../../assets/icons/google.svg";
function LoginWithGoogle({ innerText }) {
  return (
    <Container variant="outlined" color="primary">
      <img width={25} src={google} alt="google icon" />
      <Text>{innerText || "Log in with google"}</Text>
    </Container>
  );
}

export default LoginWithGoogle;

const Container = styled(Button)``;
const Text = styled.span`
  text-align: center;
  color: inherit;
  width: 100%;
`;
