import React, { useState } from "react";
import { GradientButton } from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { Input, InputWrapper, Label } from "../../components/formItems";
import { Block, Form, Heading, TextArea, UploadImage } from "./styles";
import { categories } from "../../data/category";

function AddProduct() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  console.info(selectedIndex);
  return (
    <>
      <Heading>Add Product</Heading>
      <Form>
        {/* Upload Image */}
        <UploadImage>
          <input type="file" />
        </UploadImage>
        {/* Product Name */}
        <InputWrapper>
          <Label>Product Name</Label>
          <Input name="name" placeholder="Product Name" />
        </InputWrapper>
        {/* Meetup Place */}
        <InputWrapper>
          <Label>Meet Up Location</Label>
          <Input name="details" placeholder="Meet Up Location" />
        </InputWrapper>
        <Block>
          {/* Selling Price */}
          <InputWrapper>
            <Label>Selling Price</Label>
            <Input name="sellingPrice" placeholder="Price in Taka" />
          </InputWrapper>
          {/* Original Price */}
          <InputWrapper>
            <Label>Original Price</Label>
            <Input name="originalPrice" placeholder="Price in Taka" />
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
          />
          {/* Other Brand */}
          {selectedIndex === -1 && (
            <InputWrapper>
              <Label>Enter Brand Name</Label>
              <Input name="brandName" placeholder="Price in Taka" />
            </InputWrapper>
          )}
        </Block>
        {/* Product Details */}
        <InputWrapper>
          <Label>Extra Details</Label>
          <TextArea
            as="textarea"
            name="details"
            placeholder="Product Details"
          />
        </InputWrapper>
        <GradientButton
          type="submit"
          style={{ marginInline: "auto", marginTop: "1rem" }}
        >
          Submit
        </GradientButton>
      </Form>
    </>
  );
}

export default AddProduct;
