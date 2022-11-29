import React from "react";
import { Link as RrdLink, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../../utils/breakpoints";
import Skeleton from "react-loading-skeleton";
import { useBrands } from "../../hooks/useBrands";

function Sidebar() {
  const { data = [], isLoading } = useBrands();

  const { pathname } = useLocation();

  function isActive(id) {
    return pathname.includes(id) ? "true" : undefined;
  }

  return (
    <Container>
      <Heading>Category</Heading>
      <NavLinks>
        {isLoading && (
          <Skeleton
            count={8}
            height={25}
            width="100%"
            style={{
              marginBottom: "1rem",
            }}
          />
        )}

        {!isLoading && (
          <Link to={"/category/all"} active={isActive("all")}>
            All
          </Link>
        )}

        {data.map((data, i) => (
          <Link
            to={"/category/" + data._id}
            key={data._id}
            active={isActive(data._id)}
          >
            {" "}
            {data.name}{" "}
          </Link>
        ))}
      </NavLinks>
    </Container>
  );
}

export default Sidebar;

const Container = styled.aside`
  display: none;
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  background-image: var(--paper-1);
  @media ${device.md} {
    display: block;
    /* width: fit-content; */
    min-height: calc(100vh - 54px);
    ${(p) => {
      if (p.theme.palette.mode === "dark") return css``;
      else
        return css`
          box-shadow: 15px 0 38px -30px hsl(var(--primary-hue) 80% 20%);
        `;
    }}
    grid-column: 1/3;
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
  background-color: ${(p) =>
    p.active
      ? "hsl(var(--primary-main) / 10%)"
      : "hsl(var(--primary-main) / 0%)"};
  &:hover {
    background-color: hsl(var(--primary-main) / 5%);
  }
`;
