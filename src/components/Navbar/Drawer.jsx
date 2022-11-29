import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Portal from "../../services/portal";

function Drawer() {
  const { pathname } = useLocation();

  return (
    <Portal>
      <Container>
        <Heading>Menu</Heading>
        <Nav>
          <NavLink to="/" active={pathname.includes("/") ? "true" : undefined}>
            Home
          </NavLink>

          <NavLink
            to="/category/all"
            active={pathname.includes("/category") ? "true" : undefined}
          >
            Browse
          </NavLink>

          <NavLink
            to="/blog"
            active={pathname.includes("/blog") ? "true" : undefined}
          >
            Blog
          </NavLink>
        </Nav>
      </Container>
    </Portal>
  );
}

export default Drawer;

const Container = styled.div`
  position: fixed;
  min-height: calc(100vh - 64px);
  top: 64px;
  right: 0;
  min-width: 280px;
  padding-left: 2rem;
  padding-right: var(--gip);
  background-image: var(--paper-4);
  padding-block: 1rem;
  z-index: 100;
`;

const Heading = styled.h1`
  margin-bottom: 0.5rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.label``;

const NavLink = styled(Link)`
  padding: 0.3em 0.7em;
  font-size: 1.15rem;
  color: ${(p) =>
    p.active ? "hsl(var(--text-primary))" : "hsl(var(--text-secondary))"};
`;
