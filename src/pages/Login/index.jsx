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
import { useFormik } from "formik";
import { LoginFormSchema } from "../../schemas/login.schema";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { logIn } = useAuth();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: LoginFormSchema,
  });

  async function onSubmit(values, actions) {
    try {
      const res = await logIn(values.email, values.password);
      actions.resetForm();
      // console.info("login res=", res);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  // console.info(isSubmitting);

  return (
    <Container>
      <Box>
        <Heading>Login</Heading>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="someone@example.domain"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? "true" : undefined}
            />
            {errors.email && touched.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>

            <Input
              name="password"
              type="password"
              placeholder="strongPassword"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? "true" : undefined}
            />
            {errors.password && touched.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}
          </InputWrapper>
          <GradientButton
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting ? "true" : undefined}
          >
            Login
          </GradientButton>
        </Form>
        <OrDevider />
        <LoginWithGoogle
          isSubmitting={isSubmitting}
          setSubmitting={setSubmitting}
          innerText="Login With Google"
          navigateTo={from}
        />
        <BoxFooterText>
          Don't Have an account?{" "}
          <LinkText to="/register" state={{ from: location.state?.from }}>
            Register
          </LinkText>{" "}
        </BoxFooterText>
      </Box>
    </Container>
  );
}

export default Login;
