import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

function Images({ images, onDelete = () => {} }) {
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
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, Pagination]}
          className="add-product-images"
        >
          {images.map((image, i) => (
            <SwiperItem key={i}>
              <DeleteButton type="button" onClick={() => onDelete(i)}>
                <MdDelete />
              </DeleteButton>
              <img src={image?.preview} alt={images?.name} />
            </SwiperItem>
          ))}

          {/* <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperItem>
          <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperItem>
          <SwiperItem>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperItem> */}
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
