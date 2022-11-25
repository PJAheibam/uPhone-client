import React, { useCallback, useState } from "react";
import { GradientButton } from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useDropzone } from "react-dropzone";
import {
  HelperText,
  Input,
  InputWrapper,
  Label,
} from "../../components/formItems";
import { Block, Form, Heading, TextArea, UploadImage } from "./styles";
import { categories } from "../../data/category";
import { useFormik } from "formik";
import { AddProductFormSchema } from "../../schemas/addProduct.schema";
import imgAPI from "../../api/uploadImage";
import ProgressBar from "../../components/ProgressBar";

const initialValues = {
  productName: "",
  meetUpLocation: "",
  sellingPrice: "",
  originalPrice: "",
  brandId: "",
  brand: "",
  moreDetails: "",
  images: "",
};

function AddProduct() {
  const [imgError, setImgError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
    maxSize: 1048576 * 5, //  max size is 5 MB
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: AddProductFormSchema,
  });

  function onSubmit(values, actions) {
    console.info(values);
  }

  function handleOptionClick(id, text) {
    id && setFieldValue("brandId", id.toString());
    text && setFieldValue("brand", text);
  }

  function handleOnDrop(files, rejectedFiles) {
    // console.info("Accepted Files", files);
    // console.info("Rejected Files", rejectedFiles);
    setFieldTouched(true);
    if (rejectedFiles.length > 0) {
      setImgError("We only accept .jpg, .jpeg & .png type image");
      setFieldError("We only accept .jpg, .jpeg & .png type image");
      return;
    }

    setImgError("");
    setFieldError("");

    files.map(async (file) => {
      try {
        setIsImgUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        const res = await imgAPI.post("", formData, {
          onUploadProgress: ({ total, loaded }) => {
            let uploadProgress = Math.round((loaded * 100) / total);
            setProgress(uploadProgress);
          },
        });

        const imageData = {
          title: res.data?.data?.title,
          display_url: res.data?.data?.display_url,
          thumb_url: res.data?.data?.thumb?.url,
          medium_url: res.data?.data?.medium?.url,
          delete_url: res.data?.data?.delete_url,
        };

        console.info(imageData);

        if (imageData.display_url) {
          setFieldValue(
            "images",
            values.images.length > 0
              ? [...values.images, imageData]
              : [imageData]
          );
        }
      } catch (err) {
        console.error("image upload error", err);
      } finally {
        setProgress(0);
        setIsImgUploading(false);
      }
    });
  }

  return (
    <>
      <Heading>Add Product</Heading>
      <Form onSubmit={handleSubmit}>
        {/* Upload Image */}
        <UploadImage {...getRootProps()}>
          <input
            name="images"
            type="file"
            error={imgError ? "true" : undefined}
            {...getInputProps()}
          />
          {isImgUploading && (
            <ProgressBar
              value={progress}
              borderRadius="var(--border-radius-sm)"
              containerStyles={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            />
          )}
        </UploadImage>
        {imgError ||
          (errors.images && (
            <HelperText type="error">{imgError || errors.images}</HelperText>
          ))}
        {/* Product Name */}
        <InputWrapper>
          <Label>Product Name</Label>
          <Input
            name="productName"
            placeholder="Product Name"
            value={values.productName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.productName && touched.productName ? "true" : undefined
            }
          />
          {errors.productName && touched.productName && (
            <HelperText type="error">{errors.productName}</HelperText>
          )}
        </InputWrapper>
        {/* Meetup Place */}
        <InputWrapper>
          <Label>Meet Up Location</Label>
          <Input
            name="meetUpLocation"
            placeholder="Meet Up Location"
            value={values.meetUpLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.meetUpLocation && touched.meetUpLocation
                ? "true"
                : undefined
            }
          />
          {errors.meetUpLocation && touched.meetUpLocation && (
            <HelperText type="error">{errors.meetUpLocation}</HelperText>
          )}
        </InputWrapper>
        <Block>
          {/* Selling Price */}
          <InputWrapper>
            <Label>Selling Price</Label>
            <Input
              name="sellingPrice"
              placeholder="Price in Taka"
              type="number"
              min={1}
              value={values.sellingPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.sellingPrice && touched.sellingPrice ? "true" : undefined
              }
            />
            {errors.sellingPrice && touched.sellingPrice && (
              <HelperText type="error">{errors.sellingPrice}</HelperText>
            )}
          </InputWrapper>
          {/* Original Price */}
          <InputWrapper>
            <Label>Original Price</Label>
            <Input
              name="originalPrice"
              placeholder="Price in Taka"
              type="number"
              value={values.originalPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.originalPrice && touched.originalPrice
                  ? "true"
                  : undefined
              }
            />
            {errors.originalPrice && touched.originalPrice && (
              <HelperText type="error">{errors.originalPrice}</HelperText>
            )}
          </InputWrapper>
        </Block>
        <Block>
          <Dropdown
            data={categories.map((item, i) => ({
              id: i,
              text: item.brandName,
            }))}
            defaultLabel="select brand"
            setSelected={setSelectedIndex}
            onclick={handleOptionClick}
          />
          {/* Other Brand */}
          {selectedIndex === -1 && (
            <InputWrapper>
              <Label>Enter Brand Name</Label>
              <Input
                name="brand"
                placeholder="Price in Taka"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.brand && touched.brand ? "true" : undefined}
              />
              {errors.brand && touched.brand && (
                <HelperText type="error">{errors.brand}</HelperText>
              )}
            </InputWrapper>
          )}
        </Block>
        {/* Product Details */}
        <InputWrapper>
          <Label>Extra Details</Label>
          <TextArea
            as="textarea"
            name="moreDetails"
            placeholder="Product Details"
            value={values.moreDetails}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.moreDetails && touched.moreDetails ? "true" : undefined
            }
          />
          {errors.moreDetails && touched.moreDetails && (
            <HelperText type="error">{errors.moreDetails}</HelperText>
          )}
        </InputWrapper>
        <GradientButton
          type="submit"
          style={{ marginInline: "auto", marginTop: "1rem" }}
          onclick={() => console.warn(errors)}
        >
          Submit
        </GradientButton>
        <button
          type="button"
          onClick={() => {
            console.info(values);
            console.info(errors);
          }}
        >
          Check
        </button>
      </Form>
    </>
  );
}

export default AddProduct;
