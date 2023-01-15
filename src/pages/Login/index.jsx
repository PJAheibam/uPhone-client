import React, { useState } from "react";
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
import OrDivider from "../../components/OrDivider";
import LoginWithGoogle from "../../components/LoginWithGoogle";
import { useFormik } from "formik";
import { LoginFormSchema } from "../../schemas/login.schema";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { getAccessToken } from "../../api/getAccessToken";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { logIn, loading, user } = useAuth();
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

  // console.info(from);

  async function onSubmit(values, actions) {
    try {
      const res = await logIn(values.email, values.password);

      getAccessToken({ uid: res.user?.uid, email: res.user?.email });

      navigate(from, { replace: true });

      actions.resetForm();
      setError(null);
    } catch (err) {
      if (err.code === "auth/user-not-found") setError("User not found");
      else setError("Email or password is incorrect");
      console.error(err.code);
    }
  }

  // console.info(isSubmitting);
  if (loading) return <Loading />;

  if (user?.uid) return <Navigate to="/" replace />;

  return (
    <Container>
      <Box>
        <Heading>Login</Heading>
        {error && (
          <HelperText
            type="error"
            style={{
              marginBlock: "0.75em",
              fontSize: "1rem",
              paddingBlock: "0.75em",
            }}
          >
            {error}
          </HelperText>
        )}
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
        <OrDivider />
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
