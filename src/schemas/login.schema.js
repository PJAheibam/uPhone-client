import * as yup from "yup";

const REQUIRED = "Required!";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Entered email is invalid!").required(REQUIRED),
  password: yup.string().min(6).required(REQUIRED),
});
