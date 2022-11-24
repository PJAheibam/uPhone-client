import React from "react";
import { Link as RrdLink } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../../data/category";
import { device } from "../../utils/breakpoints";

function Sidebar() {
  return (
    <Container>
      <Heading>Category</Heading>
      <NavLinks>
        {categories.map((data, i) => (
          <Link to={"/category/" + data.brandName} key={i}>
            {" "}
            {data.brandName}{" "}
          </Link>
        ))}
      </NavLinks>
    </Container>
  );
}

export default Sidebar;

const Container = styled.aside`
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  background-image: var(--paper-1);
  @media ${device.md} {
    box-shadow: 15px 0 38px -30px hsl(var(--primary-hue) 80% 20%);
    grid-column: 1/4;
    padding-right: 1rem;
    padding-left: var(--gip);
  }
`;

const Heading = styled.h1`
  font-weight: 500;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  margin-bottom: 0.5em;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Link = styled(RrdLink)`
  font-size: 1.15rem;
  padding: 0.5em 1em;
  border-radius: 1em;
  &:hover {
    background-color: hsl(var(--primary-main) / 10%);
  }
`;
