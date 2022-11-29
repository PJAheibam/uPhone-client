import * as yup from "yup";

const REQUIRED = "Required";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const AddProductFormSchema = yup.object().shape({
  productName: yup.string().required(REQUIRED),
  location: yup.string().required(REQUIRED),
  sellingPrice: yup.number().required(REQUIRED).positive().min(1),
  originalPrice: yup.number().required(REQUIRED).positive(),
  brand: yup.string().required(REQUIRED),
  brandId: yup.string(),
  moreDetails: yup.string(),
  images: yup
    .array()
    .required("Upload at least one image")
    .nullable()
    .required(REQUIRED),
  purchaseYear: yup
    .number()
    .min(1980)
    .max(new Date().getFullYear())
    .required(REQUIRED),
  condition: yup
    .string()
    .oneOf(
      ["like new", "good", "fair"],
      "Accepted values are brand new, good, fair"
    )
    .required(REQUIRED),
  // phoneNumber: yup
  //   .string()
  //   .matches(phoneRegExp, "Enter phone number without whitespace, - and +")
  //   .required(REQUIRED),
});
