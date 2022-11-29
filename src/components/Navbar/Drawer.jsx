import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Portal from "../../services/portal";
import { useTransition, animated, easings } from "react-spring";
import { useBreakpoints } from "react-use-size";
import { useToggleTheme } from "../../context/ThemeContext";
import ToggleSwitch from "../ToggleSwitch";
import { useAuth } from "../../context/AuthContext";

function Drawer({ open }) {
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();
  const [showThemeToggler, showLogin] = useBreakpoints([410, 529]);

  const { theme, toggleTheme } = useToggleTheme();

  const transApi = useTransition(open, {
    from: { right: "-100%" },
    enter: { right: "0%" },
    leave: { right: "-100%" },
    config: {
      duration: 500,
      easing: easings.easeOutSine,
    },
  });

  return (
    <Portal>
      {transApi(
        (styles, o) =>
          o && (
            <Container style={styles}>
              <Heading>Menu</Heading>
              <Nav>
                {user?.uid && (
                  <NavLink
                    to="/dashboard"
                    active={pathname === "/dashboard" ? "true" : undefined}
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink to="/" active={pathname === "/" ? "true" : undefined}>
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
                {showLogin && (
                  <NavLink
                    to="/login"
                    active={pathname.includes("/blog") ? "true" : undefined}
                  >
                    login
                  </NavLink>
                )}
              </Nav>
              {showThemeToggler && (
                <ThemeSwitch onClick={toggleTheme} type="button">
                  Dark mode
                  <ToggleSwitch value={theme.palette.mode === "dark"} />
                </ThemeSwitch>
              )}
              {user?.uid && (
                <NavLink as="button" onClick={logOut}>
                  Logout
                </NavLink>
              )}
            </Container>
          )
      )}
    </Portal>
  );
}

export default Drawer;

const Container = styled(animated.div)`
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  min-width: 280px;
  padding-left: 2rem;
  padding-right: var(--gip);
  background-image: var(--paper-4);
  padding-bottom: 1rem;
  padding-top: calc(64px + 1rem);
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
  &:hover {
    color: hsl(var(--text-primary));
  }
`;

const ThemeSwitch = styled.div`
  font-size: 1.15rem;
  padding: 0.3em 0.7em;

  color: hsl(var(--text-secondary));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  width: 100%;
`;
