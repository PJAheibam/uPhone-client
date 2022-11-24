import React from "react";
import { GradientButton } from "../../components/Button";
import { Input, InputWrapper, Label } from "../../components/formItems";
import { Block, Form, Heading, TextArea } from "./styles";

function AddProduct() {
  return (
    <>
      <Heading>Add Product</Heading>
      <Form>
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
        <Block></Block>
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
