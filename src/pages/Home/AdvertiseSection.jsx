import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

function AdvertiseSection() {
  const props = {
    grabCursor: true,
    spaceBetween: 48,
    centeredSlides: true,
    slidesPerView: "auto",
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      clickable: true,
    },
    navigation: true,
    modules: [Autoplay, Pagination, Navigation],
    // className: "mySwiper",
  };
  return (
    <Container>
      <Heading>Hot Deals</Heading>
      <SwiperContainer {...props}>
        <Item>
          <Image
            src="https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max"
            alt="mobile phone"
          />
          <Content>
            <ItemName>Iphone 12</ItemName>
            <Seller>Prosenjit</Seller>
            <Location>Sylhet</Location>
            <Text>
              Price: <Price>40000tk</Price>{" "}
            </Text>
            <Button
              as={Link}
              to="/category/1"
              variant="outlined"
              style={{ marginTop: "15px" }}
            >
              View
            </Button>
          </Content>
        </Item>
        <Item>
          <Image
            src="https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max"
            alt="mobile phone"
          />
          <Content>
            <ItemName>Iphone 12</ItemName>
            <Seller>Prosenjit</Seller>
            <Location>Sylhet</Location>
            <Text>
              Price: <Price>40000tk</Price>{" "}
            </Text>
            <Button variant="outlined" style={{ marginTop: "15px" }}>
              View
            </Button>
          </Content>
        </Item>
        <Item>
          <Image
            src="https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max"
            alt="mobile phone"
          />
          <Content>
            <ItemName>Iphone 12</ItemName>
            <Seller>Prosenjit</Seller>
            <Location>Sylhet</Location>
            <Text>
              Price: <Price>40000tk</Price>{" "}
            </Text>
            <Button variant="outlined" style={{ marginTop: "15px" }}>
              View
            </Button>
          </Content>
        </Item>
      </SwiperContainer>
    </Container>
  );
}

export default AdvertiseSection;

const Container = styled.article`
  /* padding-inline: var(--gip); */
  /* padding-block: 1rem; */
  /* overflow-x: hidden; */
`;

const Heading = styled.h1`
  font-size: clamp(1.25rem, 5vw, 2.25rem);
  text-align: center;
`;

const Item = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  background-image: var(--paper-2);
  box-shadow: var(--box-shadow-lg);
  /* margin-bottom: 2rem; */
`;

const SwiperContainer = styled(Swiper)`
  padding-inline: var(--gip);
  padding-block: 2rem;
  overflow-x: hidden;
`;

const Content = styled.div`
  padding-inline: 1rem;
  padding-bottom: 1rem;
`;

const ItemName = styled.h2`
  margin-block: 0.25em;
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: cover;
  object-position: center;
`;

const Seller = styled.p`
  margin-block: 0.25em;
`;

const Location = styled.p`
  margin-block: 0.25em;
`;

const Text = styled.p`
  color: var(hsl(--text-secondary));
`;

const Price = styled.span`
  color: hsl(var(--primary-main));
`;
