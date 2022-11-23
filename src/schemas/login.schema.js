import * as yup from "yup";

const REQUIRED = "Required";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Email address is invalid").required(REQUIRED),
  password: yup.string().min(6).required(REQUIRED),
});
