import React, { useState } from "react";
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
import { useFormik } from "formik";
import { AddProductFormSchema } from "../../schemas/addProduct.schema";
import client from "../../api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Images from "./Images";
import { RiImageAddLine as AddImageIcon } from "react-icons/ri";
import { uploadImages } from "../../services/uploadImages";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";

const initialValues = {
  productName: "",
  location: "",
  sellingPrice: "",
  originalPrice: "",
  brandId: "",
  brand: "",
  moreDetails: "",
  images: "",
  condition: "",
  purchaseYear: "",
  // phoneNumber: "",
};

function AddProduct() {
  const date = new Date();

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await client.get("/brands");
      return res.data;
    },
    refetchOnMount: true,
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOnDrop,
    maxSize: 1048576 * 5, //  max size is 5 MB
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });
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
    isSubmitting,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: AddProductFormSchema,
  });

  function handleOptionClick(id, text) {
    id && setFieldValue("brandId", id.toString());
    text && setFieldValue("brand", text);
  }

  function handleOnDrop(files, rejectedFiles) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...files]);
    if (values.images.length === 0) setFieldValue("images", files);
    if (values.images.length > 0)
      setFieldValue("images", [...values.images, ...files]);
    if (rejectedFiles.length > 0) {
      setImgError("We only accept .jpg, .jpeg & .png type image");
      setFieldError("We only accept .jpg, .jpeg & .png type image");
      return;
    }

    setImgError("");
    setFieldError("images", undefined);
  }

  function removeImage(index) {
    const updatedImages = images.filter((_image, i) => index !== i);
    setFieldValue("images", updatedImages);
    setImages(updatedImages);
  }

  function handleConditionClick(__id, text) {
    setFieldValue("condition", text.toLowerCase());
  }

  async function onSubmit(values, actions) {
    // console.info(values);
    const toastId = toast.loading("Adding product...");
    try {
      if (!user.uid) throw "User info must needed";
      if (!localStorage.getItem("access-token")) throw "access-token needed";
      const uploadedImages = await uploadImages(images);
      const data = {
        name: values.productName,
        moreDetails: values.moreDetails,
        sellingPrice: values.sellingPrice,
        originalPrice: values.originalPrice,
        location: values.location,
        images: uploadedImages,
        brand: values.brand,
        brandId: values.brandId,
        email: user.email,
        uid: user.uid,
        condition: values?.condition,
        purchaseYear: values.purchaseYear,
        postedOn: {
          time: format(date, "p"),
          date: format(date, "PP"),
        },
      };
      const res = await client.post("/products", data);
      // console.info()
      console.info(res);
      toast.success("Product Added", {
        id: toastId,
      });
      actions.resetForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error("An error occur while uploading product!", {
        id: toastId,
      });
      console.error(error);
    }
  }

  return (
    <>
      <Heading>Add Product</Heading>
      <Form onSubmit={handleSubmit}>
        <Images images={values.images || []} onDelete={removeImage} />
        {/* Upload Image */}
        <Tippy content="Add one or more photos" placement="bottom">
          <UploadImage as="div" {...getRootProps()}>
            <input
              name="images"
              type="file"
              error={imgError ? "true" : undefined}
              // onBlur={() => setFieldTouched("images", true)}
              {...getInputProps()}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <AddImageIcon />
          </UploadImage>
        </Tippy>
        {!!imgError && <HelperText type="error">{imgError}</HelperText>}
        {errors.images && touched.images && (
          <HelperText type="error">{imgError || errors.images}</HelperText>
        )}

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
        {/* Price Section */}
        <Block>
          {/* Selling Price */}
          <InputWrapper>
            <Label>Selling Price</Label>
            <Input
              name="sellingPrice"
              placeholder="Price in Doller"
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
              placeholder="Price in Doller"
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
          {/* Purchase Year */}
          <InputWrapper>
            <Label>Purchase Year</Label>
            <Input
              name="purchaseYear"
              placeholder="2000"
              type="number"
              min={1980}
              max={date.getFullYear()}
              value={values.purchaseYear}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.purchaseYear && touched.purchaseYear ? "true" : undefined
              }
            />
            {errors.purchaseYear && touched.purchaseYear && (
              <HelperText type="error">{errors.purchaseYear}</HelperText>
            )}
          </InputWrapper>
          {/* Condition */}

          <div>
            <Dropdown
              data={["Like New", "Good", "Fair"].map((text, i) => ({
                id: i,
                text,
              }))}
              label="Condition"
              defaultValue="Select Condition"
              // setSelected={setSelectedIndex}
              onclick={handleConditionClick}
              showOther={false}
            />
            {errors.condition && touched.condition && (
              <HelperText type="error" style={{ marginTop: "0.5rem" }}>
                {errors.condition}
              </HelperText>
            )}
          </div>
        </Block>
        {/* Mobile Number */}
        {/* <InputWrapper>
          <Label>phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="01712 345 678"
            type="string"
            min={1}
            max={date.getFullYear()}
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.phoneNumber && touched.phoneNumber ? "true" : undefined
            }
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <HelperText type="error">{errors.phoneNumber}</HelperText>
          )}
        </InputWrapper> */}
        {/* Brand Section */}
        <Block>
          <div>
            <Dropdown
              data={brands.map((item) => ({
                id: item._id,
                text: item.name,
              }))}
              label="Brand"
              defaultValue="Select Brand"
              onclick={handleOptionClick}
              showOther={false}
            />
            {errors.brand && touched.brand && (
              <HelperText type="error" style={{ marginTop: "0.4rem" }}>
                {errors.brand}
              </HelperText>
            )}
          </div>
          {/* Location Place */}
          <InputWrapper>
            <Label>Location</Label>
            <Input
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location && touched.location ? "true" : undefined}
            />
            {errors.location && touched.location && (
              <HelperText type="error">{errors.location}</HelperText>
            )}
          </InputWrapper>
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
          disabled={isSubmitting}
          loading={isSubmitting ? "true" : undefined}
        >
          Submit
        </GradientButton>
        <button
          type="button"
          onClick={() => {
            // console.info(images);
            // console.info(.current.files);
            console.info(values);
            // console.info(errors);
            // console.info(touched);
            // console.info(format(date, "PPp"));
          }}
        >
          Check
        </button>
      </Form>
    </>
  );
}

export default AddProduct;
