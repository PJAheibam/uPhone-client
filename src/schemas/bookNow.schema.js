import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const BookNowSchema = yup.object().shape({
  meetUpLocation: yup.string().required("Required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Enter phone number without whitespace, - and +")
    .required("Required"),
});
