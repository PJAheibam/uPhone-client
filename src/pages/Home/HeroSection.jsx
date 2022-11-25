import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import heroImg1 from "../../assets/images/home-banner.jpg";

function HeroSection() {
  return (
    <Container>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <BannerContainer></BannerContainer>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

export default HeroSection;

const Container = styled.article`
  width: 100vw;
  overflow-x: hidden;
`;

const BannerContainer = styled.div`
  width: 100%;
  aspect-ratio: 18/9;
  /* min-height: 500px; */
  background-image: url(${heroImg1});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
