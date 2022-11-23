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
} from "./styles";
import { GradientButton } from "../../components/Button";
import OrDevider from "../../components/OrDevider";
import LoginWithGoogle from "../../components/LoginWithGoogle";

function Register() {
  return (
    <Container>
      <Box>
        <Form>
          <Heading>Register</Heading>
          <InputWrapper>
            <Label>Full Name</Label>
            <Input name="fullName" placeholder="Full Name" />
            {/* <HelperText type="error">Enter your full name here</HelperText> */}
          </InputWrapper>
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
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="strongPassword"
            />
            {/* <HelperText type="error">Enter your full name here</HelperText> */}
          </InputWrapper>
          <GradientButton type="submit">Submit</GradientButton>
          <OrDevider />
          <LoginWithGoogle />
          <BoxFooterText>
            Already Have an account? <LinkText to="/login">Login</LinkText>{" "}
          </BoxFooterText>
        </Form>
      </Box>
    </Container>
  );
}

export default Register;
