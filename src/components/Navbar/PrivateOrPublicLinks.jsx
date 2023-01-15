import React from "react";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import { NavLink } from "./NavLinks";
import { useTransition } from "react-spring";
import { useLocation } from "react-router-dom";

function PrivateOrPublicLinks() {
  const { user } = useAuth();
  // const transition = useTransition(user.uid, {
  //   from: { width: 0 },
  //   enter: { width: "20px" },
  //   leave: { width: 0 },
  // });
  const { pathname } = useLocation();
  return (
    <Container>
      <NavLink
        to="/dashboard"
        isactive={pathname === "/dashboard" ? "active" : undefined}
      >
        Dashboard
      </NavLink>
      <NavLink as="button">Logout</NavLink>
    </Container>
  );
}

export default PrivateOrPublicLinks;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
`;
