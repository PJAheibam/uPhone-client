import * as yup from "yup";

const REQUIRED = "Required";

export const RegistrationFormSchema = yup.object().shape({
  fullName: yup.string().required(REQUIRED),
  email: yup.string().email("Email address is invalid").required(REQUIRED),
  password: yup.string().min(6).required(REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(REQUIRED),
});

// role undefined means he/she is a normal user;
