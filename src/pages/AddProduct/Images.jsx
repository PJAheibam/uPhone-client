import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";

function Images() {
  return (
    <>
      {/* Images */}
      <ImagesContainer>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          slidesPerView={3}
          spaceBetween={10}
          navigation
          pagination
          grabCursor
          modules={[Navigation, Pagination]}
          className="add-product-images"
        >
          <SwiperItem>
            <DeleteButton type="button">
              <MdDelete />
            </DeleteButton>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperItem>
          <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperItem>
          <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperItem>
          <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperItem>
        </Swiper>
      </ImagesContainer>
    </>
  );
}

export default Images;

const ImagesContainer = styled.div`
  max-height: 300px;
  /* overflow: hidden; */
`;

const SwiperItem = styled(SwiperSlide)`
  position: relative;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const DeleteButton = styled.button`
  font-size: 1.5rem;
  padding: 0.15em;
  /* color: hsl(var(--error-main)) !important; */
  background-color: hsl(var(--error-main));
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 20px;
  &:active {
    scale: 0.95;
  }
`;
