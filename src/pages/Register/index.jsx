import React from "react";
import {
  HelperText,
  Input,
  InputWrapper,
  Label,
} from "../../components/formItems";
import { Box, Container, Form, Heading } from "./styles";

function Register() {
  return (
    <Container>
      <Box>
        <Form>
          <Heading>Register</Heading>
          <InputWrapper>
            <Label>Full Name</Label>
            <Input name="fullName" placeholder="Full Name" />
            <HelperText type="error">Enter your full name here</HelperText>
          </InputWrapper>
        </Form>
      </Box>
    </Container>
  );
}

export default Register;
