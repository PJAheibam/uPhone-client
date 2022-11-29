import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  HelperText,
  Input,
  InputWrapper,
  Label,
} from "../../components/formItems";
import Modal from "../../components/Modal";
import { GradientButton } from "../../components/Button";
import { Pagination, Navigation } from "swiper";
import { device } from "../../utils/breakpoints";
import { useFormik } from "formik";
import { BookNowSchema } from "../../schemas/bookNow.schema";
import userIcon from "../../assets/icons/user.png";
import { MdVerified } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import client from "../../api";
import { toast } from "react-hot-toast";

function BookNowModal({ product, user, setProduct }) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: { meetUpLocation: "", phoneNumber: "" },
    onSubmit,
    validationSchema: BookNowSchema,
  });

  async function onSubmit(values, actions) {
    const toastId = toast.loading("Booking...");
    try {
      const payload = {
        productId: product._id,
        buyerId: user?.uid,
        sellerId: product.sellerId,
        meetUpLocation: values.meetUpLocation,
        buyerPhoneNumber: values.phoneNumber,
      };
      // console.info(payload);
      const res = client.post(`/bookings`, payload);
      toast.success("Booked!", { id: toastId });
    } catch (error) {
      toast.error("An error occur while booking", { id: toastId });
    }
  }

  function handleModalClose() {
    setProduct(null);
    resetForm();
  }
  // console.info(product);
  return (
    <Modal open={!!product} onClose={handleModalClose}>
      <Wrapper>
        <Heading>Book Now</Heading>
        <MobileSection>
          <PhotoProvider>
            <SwiperContainer
              // pagination={{
              //   type: "fraction",
              // }}
              spaceBetween={10}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {product?.images &&
                product?.images.map((image, i) => (
                  <SwiperItem key={i}>
                    <PhotoView src={image?.display_url}>
                      <img src={image?.display_url} alt={image?.title} />
                    </PhotoView>
                  </SwiperItem>
                ))}
            </SwiperContainer>
          </PhotoProvider>
          <Content>
            <User style={{ marginBottom: "0.25rem" }}>
              <Avatar
                src={product?.sellerInfo?.photoURL || userIcon}
                alt={user?.displayName}
              />
              <Info>
                <UserName>
                  {product?.sellerInfo?.fullName}{" "}
                  {product?.sellerInfo?.verified ? (
                    <MdVerified color="hsl(var(--primary-dark))" />
                  ) : null}
                </UserName>
                <Email>Seller</Email>
              </Info>
            </User>
            <Title>{product?.name}</Title>
            <Text>Selling Price: {product?.sellingPrice} ৳</Text>
            <Text>Location: {product?.location}</Text>
            <Text>Condition: {product?.condition}</Text>
            <Text>Original Price: {product?.originalPrice} ৳</Text>

            <Details>More: {product?.moreDetails}</Details>
          </Content>
        </MobileSection>
        <Hr />
        {/******************* Form Start  *********************/}
        <Form onSubmit={handleSubmit}>
          <User>
            <Avatar src={user?.photoURL || userIcon} alt={user?.displayName} />
            <Info>
              <UserName>{user?.displayName}</UserName>
              <Email>{user?.email}</Email>
            </Info>
          </User>
          <Inputs>
            <InputWrapper style={{ width: "100%" }}>
              <Label>Meet Up Location</Label>
              <Input
                name="meetUpLocation"
                placeholder="Where do you want to meet"
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
            <InputWrapper style={{ width: "100%" }}>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                placeholder="01__________"
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
            </InputWrapper>
          </Inputs>
          <GradientButton
            type="submit"
            style={{
              width: "fit-content",
              marginInline: "auto",
              marginTop: "0.5rem",
            }}
          >
            Submit
          </GradientButton>
        </Form>
        {/******************** Form End  *********************/}
      </Wrapper>
    </Modal>
  );
}

export default BookNowModal;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-height: 100vh;
  overflow: overlay;
  width: 100vw;
  @media ${device.sm} {
    width: auto;
  }
`;

const Heading = styled.h1`
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const SwiperContainer = styled(Swiper)`
  flex-basis: 100%;
  width: 100vw;
  @media ${device.sm} {
    max-width: 300px;
  }
`;

const SwiperItem = styled(SwiperSlide)`
  /* width: 200px; */
  height: 200px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Content = styled.div``;

const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  @media ${device.sm} {
    flex-direction: row;
    margin-bottom: 1rem;
    max-width: 70vw;
  }
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: hsl(var(--text-secndory));
`;

const Details = styled(Text)`
  margin-block: 0.5rem;
  max-width: 300px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  @media ${device.md} {
    flex-direction: row;
  }
`;

const User = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  box-shadow: inset 0 0 3px gray;
`;

const Info = styled.div``;

const UserName = styled.h4`
  font-size: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Email = styled.p`
  font-size: 14px;
  color: hsl(var(--text-secondary));
`;

const Hr = styled.div`
  height: 2px;
  background-color: hsl(var(--outline-variant) / 70%);
  margin-bottom: 0.75rem;
`;
