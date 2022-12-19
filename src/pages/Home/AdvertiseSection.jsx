import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import useAdvertisedProduct from "../../hooks/useAdvertisedProduct";

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
  const { data = [], isLoading } = useAdvertisedProduct();

  // console.info(data);

  if (data.length === 0) return null;

  return (
    <Container>
      <Heading>Hot Deals</Heading>
      <SwiperContainer {...props}>
        {data.map((product) => (
          <Item key={product._id}>
            <Image
              src={product?.images[0]?.display_url}
              alt={product?.images[0]?.title}
            />
            <Content>
              <ItemName>{product.name}</ItemName>
              <Text>
                Price: <Price>${product.sellingPrice}</Price>{" "}
              </Text>
              <Button
                as={Link}
                to={`/category/${product.brandId}`}
                variant="outlined"
                style={{ marginTop: "15px" }}
              >
                View
              </Button>
            </Content>
          </Item>
        ))}
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
  min-height: 400px;
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
  font-size: 1.25rem;
`;

const Image = styled.img`
  height: 250px;
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
