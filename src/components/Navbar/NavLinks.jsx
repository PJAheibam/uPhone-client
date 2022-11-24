import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { globalLinks } from "../../data/globalLinks";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavLinks() {
  const { pathname } = useLocation();
  const { user, logOut } = useAuth();

  return (
    <Container>
      {globalLinks.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          isactive={pathname === item.path ? "active" : undefined}
        >
          {" "}
          {item.name}{" "}
        </NavLink>
      ))}
      {user.uid && (
        <PrivateLinks>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink as="button" onClick={logOut}>
            Logout
          </NavLink>
        </PrivateLinks>
      )}
    </Container>
  );
}

export default NavLinks;

export const Container = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const NavLink = styled(Link)`
  text-transform: capitalize;
  font-size: 1.15rem;
  color: ${(p) =>
    p.isactive ? "hsl(var(--text-primary))" : "hsl(var(--text-secondary))"};
  transition: color 300ms ease;
  &:hover {
    color: hsl(var(--text-primary));
  }
`;

export const PrivateLinks = styled.div`
  display: flex;
  gap: 1rem;
`;
