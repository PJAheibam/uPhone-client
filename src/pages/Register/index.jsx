import React, { useEffect, useRef, useState } from "react";
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
import {
  ActiveBg,
  ToggleButton,
  ToggleButtonGroup,
} from "../../components/ToggleButton";

function Register() {
  const defaultAccountRef = useRef();
  const [accountTypeInfo, setAccountTypeInfo] = useState({
    role: "user",
    width: 0,
    left: 0,
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    setFieldValue,
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

  function handleToggleClick(e) {
    // console.info(e);
    setAccountTypeInfo({
      role: e.target.innerText.toLowerCase(),
      width: e.target.clientWidth,
      left: e.target.offsetLeft,
    });
  }

  useEffect(() => {
    const data = {
      role: defaultAccountRef.current.innerText.toLowerCase(),
      width: defaultAccountRef.current.clientWidth,
      left: defaultAccountRef.current.offsetLeft,
    };
    setAccountTypeInfo(data);
  }, []);

  return (
    <Container>
      <Box>
        <Form onSubmit={handleSubmit}>
          <Heading>Register</Heading>
          {/********** Full Name **********/}
          <InputWrapper>
            <Label>Full Name</Label>
            <Input
              name="fullName"
              placeholder="Full Name"
              value={values.fullName}
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
              value={values.email}
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
              value={values.password}
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
              value={values.confirmPassword}
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

          <ToggleButtonGroup>
            <ToggleButton ref={defaultAccountRef} onClick={handleToggleClick}>
              Buyer
            </ToggleButton>
            <ToggleButton onClick={handleToggleClick}>Seller</ToggleButton>
            <ActiveBg
              width={accountTypeInfo.width}
              left={accountTypeInfo.left}
            />
          </ToggleButtonGroup>

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
