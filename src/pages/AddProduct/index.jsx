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
import { useFormik } from "formik";
import { AddProductFormSchema } from "../../schemas/addProduct.schema";
import imgAPI from "../../api/uploadImage";
import ProgressBar from "../../components/ProgressBar";
import client from "../../api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Images from "./Images";
import { RiImageAddLine as AddImageIcon } from "react-icons/ri";

const initialValues = {
  productName: "",
  location: "",
  sellingPrice: "",
  originalPrice: "",
  brandId: "",
  brand: "",
  moreDetails: "",
  images: "",
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

  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const { getRootProps, getInputProps, isDragActive, inputRef, open, rootRef } =
    useDropzone({
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
    // console.info("Accepted Files", files);
    // console.info("Rejected Files", rejectedFiles);
    // setFieldTouched(true);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...files]);
    if (rejectedFiles.length > 0) {
      setImgError("We only accept .jpg, .jpeg & .png type image");
      setFieldError("We only accept .jpg, .jpeg & .png type image");
      return;
    }

    setImgError("");
    setFieldError("");
  }

  async function onSubmit(values, actions) {
    // console.info(values);
    const toastId = toast.loading("Adding product...");
    try {
      if (!user.uid) throw "User info must needed";
      if (!localStorage.getItem("access-token")) throw "access-token needed";
      const data = {
        name: values.productName,
        moreDetails: values.moreDetails,
        sellingPrice: values.sellingPrice,
        originalPrice: values.originalPrice,
        location: values.location,
        images: values.images,
        brand: values.brand,
        brandId: values.brandId,
        email: user.email,
        uid: user.uid,
        sellerImg: user.photoURl,
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
        <Images images={images} setImages={setImages} />
        {/* Upload Image */}
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
        {/* Meetup Place */}
        <InputWrapper>
          <Label>Meet Up Location</Label>
          <Input
            name="location"
            placeholder="Meet Up Location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.location && touched.location ? "true" : undefined}
          />
          {errors.location && touched.location && (
            <HelperText type="error">{errors.location}</HelperText>
          )}
        </InputWrapper>
        {/* Price Section */}
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
        {/* Brand Section */}
        <Block>
          <Dropdown
            data={brands.map((item) => ({
              id: item._id,
              text: item.name,
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
          disabled={isSubmitting}
          loading={isSubmitting ? "true" : undefined}
        >
          Submit
        </GradientButton>
        <button
          type="button"
          onClick={() => {
            console.info(images);
            // console.info(.current.files);
            // console.info(values);
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
