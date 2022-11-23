import React from "react";
import styled from "styled-components";

function Logo({ style }) {
  return (
    <Container style={style}>
      <Span>u</Span>
      <Text>Phone</Text>
    </Container>
  );
}

export default Logo;

const Container = styled.button`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Span = styled.span`
  text-transform: lowercase;
  color: hsl(var(--primary-main));
`;
const Text = styled.span`
  text-transform: capitalize;
  color: hsl(var(--primary-dark));
`;
