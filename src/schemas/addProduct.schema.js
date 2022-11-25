import * as yup from "yup";

const REQUIRED = "Required";

export const AddProductFormSchema = yup.object().shape({
  productName: yup.string().required(REQUIRED),
  meetUpLocation: yup.string().required(REQUIRED),
  sellingPrice: yup.number().required(REQUIRED).positive().min(1),
  originalPrice: yup.number().required(REQUIRED).positive(),
  brand: yup.string().required(REQUIRED),
  brandId: yup.string(),
  moreDetails: yup.string(),
  images: yup.array().of(yup.object()).required("Upload at least one image"),
  // images: yup
  //   .mixed()
  //   .test("fileSize", "File Size is too large", (value) => {
  //     if (value && value?.length > 0) {
  //       for (let i = 0; i < value.length; i++) {
  //         if (value[i].size > 5242880) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   })
  //   .test(
  //     "fileType",
  //     "Only the following formates are supported: png, jpg & jpeg",
  //     (value) => {
  //       if (value && value.length > 0) {
  //         for (let i = 0; i < value.length; i++) {
  //           if (
  //             value[i].type !== "image/png" &&
  //             value[i].type !== "image/jpg" &&
  //             value[i].type !== "image/jpeg"
  //           ) {
  //             return false;
  //           }
  //         }
  //       }
  //       return true;
  //     }
  //   )
  //   .required(REQUIRED),
});
