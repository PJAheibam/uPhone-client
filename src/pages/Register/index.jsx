import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HelperText,
  Input,
  InputWrapper,
  Label,
} from "../../components/formItems";
import {
  Avatar,
  Box,
  BoxFooterText,
  Container,
  Form,
  Heading,
  Image,
  LinkText,
} from "./styles";
import { GradientButton } from "../../components/Button";
import OrDivider from "../../components/OrDivider";
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
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { AiOutlineUserAdd as AddProfilePhoto } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../services/uploadImage";
import { getAccessToken } from "../../api/getAccessToken";
import useScrollToTop from "../../hooks/useScrollToTop";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const from = location.state?.from || "/";
  const { ref: groupRef, width: groupWidth } = useComponentSize();
  const defaultAccountRef = useRef();
  const { register, loading, user } = useAuth();
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
    setFieldError,
  } = useFormik({
    initialValues: {
      profilePhoto: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: RegistrationFormSchema,
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOnDrop,
    maxSize: 1048576 * 5, //  max size is 5 MB
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  async function onSubmit(values, actions) {
    try {
      let profilePhotoData = null;
      if (values.profilePhoto) {
        profilePhotoData = await uploadImage(values.profilePhoto);
      }

      const res = await register(values.email, values.password);

      const currentUser = {
        uid: res.user.uid,
        email: res.user.email,
        fullName: values.fullName,
        role: accountTypeInfo.role,
        profilePhoto: {
          title: profilePhotoData?.title || null,
          display_url: profilePhotoData?.display_url || null,
          thumb_url: profilePhotoData?.thumb?.url || null,
          medium_url: profilePhotoData?.medium?.url || null,
          delete_url: profilePhotoData?.delete_url || null,
        },
      };

      await updateProfile(res.user, {
        displayName: values.fullName,
        photoURL: profilePhotoData?.display_url,
      });

      const addUserRes = await addUser(currentUser);

      getAccessToken({ uid: res.user?.uid, email: res.user?.email });

      console.info(addUserRes.data);

      actions.resetForm();
      setError(null);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        setError("Email is already in use");
      console.error(err.code);
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

  function handleOnDrop(acceptedFiles, rejectedFiles) {
    // console.log(acceptedFiles);

    if (acceptedFiles.length > 0) {
      setFieldError("profilePhto", "");
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFieldValue("profilePhoto", acceptedFiles[0]);
    }
    if (rejectedFiles.length > 0) {
      setFieldError("profilePhoto", "We only accept .jpg, .jpeg, .png format");
    }
  }

  /************* side effects **************/
  useScrollToTop();

  useEffect(() => {
    if (!loading) {
      const data = {
        role: defaultAccountRef.current.innerText.toLowerCase(),
        width: defaultAccountRef.current.clientWidth,
        left: defaultAccountRef.current.offsetLeft,
      };
      setAccountTypeInfo(data);
    }
  }, [groupWidth, loading]);

  if (loading) return <Loading />;

  if (user?.uid) return <Navigate to="/" replace />;

  return (
    <Container>
      <Box>
        <Heading>Register</Heading>
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
          {/********** Avatar Name **********/}

          <Avatar
            aria-label="upload user profile pic"
            type="button"
            {...getRootProps()}
          >
            {values.profilePhoto ? (
              <Image src={values.profilePhoto.preview} alt="user profile" />
            ) : (
              <AddProfilePhoto />
            )}
            <input {...getInputProps()} />
          </Avatar>
          {errors.profilePhoto && (
            <HelperText type="error">{errors.profilePhoto}</HelperText>
          )}

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
        <OrDivider />

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
