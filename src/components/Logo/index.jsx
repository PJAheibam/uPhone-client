import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Logo() {
  return <Container>uPhone</Container>;
}

export default Logo;

const Container = styled(Link)`
  background: -webkit-linear-gradient(
    45deg,
    hsl(var(--primary-light)),
    hsl(var(--primary-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 600;
`;
