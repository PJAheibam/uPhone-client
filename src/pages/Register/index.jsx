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
import { useFormik } from "formik";
import { RegistrationFormSchema } from "../../schemas/registration.schema";

function Register() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: RegistrationFormSchema,
  });

  function onSubmit(values, actions) {
    console.info(values);
  }

  return (
    <Container>
      <Box>
        <Form>
          <Heading>Register</Heading>
          {/********** Full Name **********/}
          <InputWrapper>
            <Label>Full Name</Label>
            <Input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName && touched.fullName ? "true" : undefined}
            />
            {errors.fullName && touched.fullName && (
              <HelperText type="error">{errors.fullName}</HelperText>
            )}
          </InputWrapper>
          {/********** Email **********/}
          <InputWrapper>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="someone@example.domain"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? "true" : undefined}
            />
            {errors.email && touched.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}
          </InputWrapper>
          {/********** Password **********/}
          <InputWrapper>
            <Label>Password</Label>

            <Input
              name="password"
              type="password"
              placeholder="strongPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? "true" : undefined}
            />
            {errors.password && touched.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}
          </InputWrapper>
          {/********** Confirm Password **********/}
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="strongPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? "true"
                  : undefined
              }
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <HelperText type="error">{errors.confirmPassword}</HelperText>
            )}
          </InputWrapper>

          <GradientButton type="submit">Submit</GradientButton>

          <OrDevider />

          <LoginWithGoogle innerText="Register With Google" />

          <BoxFooterText>
            Already Have an account? <LinkText to="/login">Login</LinkText>{" "}
          </BoxFooterText>
        </Form>
      </Box>
    </Container>
  );
}

export default Register;
