import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
import { useComponentSize } from "react-use-size";
import { updateProfile } from "firebase/auth";
import { addUser } from "../../api/addUser";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { ref: groupRef, width: groupWidth } = useComponentSize();
  const defaultAccountRef = useRef();
  const { register } = useAuth();
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

  async function onSubmit(values, actions) {
    try {
      const res = await register(values.email, values.password);
      const currentUser = {
        uid: res.user.uid,
        email: res.user.email,
        fullName: values.fullName,
        role: accountTypeInfo.role,
      };

      await updateProfile(res.user, {
        displayName: values.fullName,
      });

      const addUserRes = await addUser(currentUser);
      console.info(addUserRes.data);
      actions.resetForm();

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
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
  }, [groupWidth]);

  return (
    <Container>
      <Box>
        <Heading>Register</Heading>
        <Form onSubmit={handleSubmit}>
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

          <ToggleButtonGroup ref={groupRef}>
            <ToggleButton ref={defaultAccountRef} onClick={handleToggleClick}>
              Buyer
            </ToggleButton>
            <ToggleButton onClick={handleToggleClick}>Seller</ToggleButton>
            <ActiveBg
              width={accountTypeInfo.width}
              left={accountTypeInfo.left}
            />
          </ToggleButtonGroup>

          <GradientButton
            disabled={isSubmitting}
            loading={isSubmitting ? "true" : undefined}
            type="submit"
          >
            Register
          </GradientButton>
        </Form>
        <OrDevider />

        <LoginWithGoogle
          innerText="Register With Google"
          isSubmitting={isSubmitting}
          setSubmitting={setSubmitting}
          navigateTo={from}
        />

        <BoxFooterText>
          Already Have an account?{" "}
          <LinkText to="/login" state={{ from: location.state?.from }}>
            Login
          </LinkText>{" "}
        </BoxFooterText>
      </Box>
    </Container>
  );
}

export default Register;
