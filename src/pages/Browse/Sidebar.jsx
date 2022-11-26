import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link as RrdLink } from "react-router-dom";
import styled, { css } from "styled-components";
import client from "../../api";
import { device } from "../../utils/breakpoints";
import Skeleton from "react-loading-skeleton";

function Sidebar() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await client.get("/brands");
      return res.data;
    },
    refetchOnMount: true,
  });

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

        {data.map((data, i) => (
          <Link to={"/category/" + data._id} key={data._id}>
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
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  background-image: var(--paper-1);
  @media ${device.md} {
    ${(p) => {
      if (p.theme.palette.mode === "dark") return css``;
      else
        return css`
          box-shadow: 15px 0 38px -30px hsl(var(--primary-hue) 80% 20%);
        `;
    }}
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
