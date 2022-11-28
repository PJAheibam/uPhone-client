import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Input, InputWrapper, Label } from "../../components/formItems";
import Modal from "../../components/Modal";
import { GradientButton } from "../../components/Button";
import { Pagination, Navigation } from "swiper";

function BookNowModal({ product, user, setProduct }) {
  function handleModalClose() {
    setProduct(null);
  }
  console.info(product);
  return (
    <Modal open={!!product} onClose={handleModalClose}>
      <Wrapper>
        <Heading>Book Now</Heading>
        <MobileSection>
          <SwiperContainer
            // pagination={{
            //   type: "fraction",
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {product?.images &&
              product?.images.map((image, i) => (
                <SwiperItem key={i}>
                  <img src={image?.display_url} alt={image?.title} />
                </SwiperItem>
              ))}
          </SwiperContainer>
          <Title>{product?.name}</Title>
        </MobileSection>

        {/******************* Form Start  *********************/}
        <Form>
          <InputWrapper>
            <Label>Meet Up Location</Label>
            <Input name="phoneNumber" placeholder="Where do you want to meet" />
          </InputWrapper>
          <InputWrapper>
            <Label>Phone Number</Label>
            <Input name="phoneNumber" placeholder="01__________" />
          </InputWrapper>
          <GradientButton type="submit">Submit</GradientButton>
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
`;

const Heading = styled.h1`
  text-transform: capitalize;
`;

const SwiperContainer = styled(Swiper)`
  max-width: 300px;
  border-radius: var(--border-radius-md);
`;

const SwiperItem = styled(SwiperSlide)`
  width: 200px;
  height: 180px;
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

const MobileSection = styled.div``;

const Title = styled.h2``;
