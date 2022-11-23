import React from "react";
import {
  HelperText,
  Input,
  InputWrapper,
  Label,
} from "../../components/formItems";
import {
  Box,
  BoxFooterText,
  Container,
  Form,
  Heading,
  LinkText,
} from "../Register/styles";
import { GradientButton } from "../../components/Button";
import OrDevider from "../../components/OrDevider";
import LoginWithGoogle from "../../components/LoginWithGoogle";

function Login() {
  return (
    <Container>
      <Box>
        <Form>
          <Heading>Login</Heading>
          <InputWrapper>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="someone@example.domain"
            />
            {/* <HelperText type="error">Enter your full name here</HelperText> */}
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>

            <Input
              name="password"
              type="password"
              placeholder="strongPassword"
            />
            {/* <HelperText type="error">Enter your full name here</HelperText> */}
          </InputWrapper>
          <GradientButton type="submit">Submit</GradientButton>
          <OrDevider />
          <LoginWithGoogle innerText="Login With Google" />
          <BoxFooterText>
            Don't Have an account? <LinkText to="/register">Register</LinkText>{" "}
          </BoxFooterText>
        </Form>
      </Box>
    </Container>
  );
}

export default Login;
