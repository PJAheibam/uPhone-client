import React from "react";
import styled from "styled-components";
import img from "../../assets/images/oops.svg";

function Oops() {
  return (
    <Container>
      <Image src={img} alt="Oops!" />
      <Text>No products available!</Text>
    </Container>
  );
}

export default Oops;

const Container = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: clamp(200px, 70vw, 400px);
`;

const Text = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: clamp(1rem, 4vw, 2rem);
  color: hsl(var(--error-main));
`;
