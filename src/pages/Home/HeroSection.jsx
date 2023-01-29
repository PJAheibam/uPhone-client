import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import lgBanner from "../../assets/images/home-banner-lg.png";
import smBanner from "../../assets/images/home-banner-sm.png";
import { useBreakpoint } from "react-use-size";

function HeroSection() {
  const isSmall = useBreakpoint(900);
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
          <BannerContainer>
            <Banner src={isSmall ? smBanner : lgBanner} />
          </BannerContainer>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

export default HeroSection;

const Container = styled.article`
  width: 100%;
  overflow-x: hidden;
`;

const BannerContainer = styled.div`
  width: 100%;
  /* aspect-ratio: 18/9; */
  /* min-height: 500px; */
  /* background-image: url(${smBanner}); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const Banner = styled.img`
  width: 100%;
`;
