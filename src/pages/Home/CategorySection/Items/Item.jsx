import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "../../../../components/Button";

function Item({ data }) {
  return (
    <Container
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <HeaderImage src={data.images[0].display_url} alt={data.name} />
      </Header>
      <Content>
        <Title>{data.name}</Title>
        <PriceSection>
          <SellingPrice>${data.sellingPrice}</SellingPrice>
          <OriginalPrice>${data.originalPrice}</OriginalPrice>
        </PriceSection>
      </Content>
      <ViewBtn
        variant="text"
        style={{
          marginTop: "auto",
          marginInline: "1rem",
          marginBottom: "1rem",
        }}
      >
        View
      </ViewBtn>
    </Container>
  );
}

export default Item;

const Header = styled.div`
  height: 200px;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(1.05rem, 4vw, 1.25rem);
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PriceSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const SellingPrice = styled.strong`
  font-weight: 500;
`;

const OriginalPrice = styled.span`
  color: hsl(var(--error-main));
  text-decoration: line-through;
`;

const ViewBtn = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  padding: 0.25em 0.75em;
  border-radius: var(--border-radius-md);
  background-color: hsl(var(--primary-light) / 20%);
  width: fit-content;
  :hover {
    background-color: hsl(var(--primary-light) / 20%);
  }
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg);
  border: 1px solid hsl(var(--outline-variant));
  overflow: hidden;
  :hover {
    border: 1px solid hsl(var(--primary-main));
  }
  :hover ${ViewBtn} {
    background-color: hsl(var(--primary-main));
    color: hsl(var(--on-primary));
  }
`;
