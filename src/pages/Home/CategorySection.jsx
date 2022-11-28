import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useBrands } from "../../hooks/useBrands";

function CategorySection() {
  const { data = [], isLoading } = useBrands();

  return (
    <Container>
      <Heading>Browse phones by brand name</Heading>
      <Brands>
        {data.map((item, i) => (
          <Brand key={i} to={"/category/" + item.name}>
            {item.name}
          </Brand>
        ))}
      </Brands>
    </Container>
  );
}

export default CategorySection;

const Container = styled.article`
  padding-inline: var(--gip);
  padding-block: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Heading = styled.h1`
  font-size: clamp(1.25rem, 5vw, 2.25rem);
  text-align: center;
`;

const Brand = styled(Link)`
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5em 1em;
  background-image: var(--paper-3);
  border-radius: 1.5em;
  border: 1px solid hsl(var(--outline-variant) / 50%);
  &:hover {
    background-image: var(--paper-5);
  }
  &:active {
    scale: 0.99;
  }
`;

const Brands = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-auto-rows: 1fr;
  gap: 1rem;
`;
