import React from "react";
import { Link as RrdLink, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Portal from "../../services/portal";
import { useTransition, animated, easings } from "react-spring";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import useUserRole from "../../hooks/useUserRole";
import { device } from "../../utils/breakpoints";
import { Badge } from "../Badge";
import userIcon from "../../assets/icons/user.png";

function DashDrawer({ open, onClose }) {
  const { user } = useAuth();

  const { data, isLoading } = useUserRole(user?.uid);
  const { pathname } = useLocation();

  const transApi = useTransition(open, {
    from: { left: "-100%" },
    enter: { left: "0%" },
    leave: { left: "-100%" },
    config: {
      duration: 500,
      easing: easings.easeOutSine,
    },
  });

  function handleClick() {
    onClose();
  }

  return (
    <Portal>
      {transApi(
        (styles, o) =>
          o && (
            <Container style={styles}>
              <SidebarHeader>
                <Avatar src={user.photoURL || userIcon} alt="User avatar" />
                <Name>{user.displayName}</Name>
                <Badge color="primary">{data?.role}</Badge>
              </SidebarHeader>
              {isLoading && (
                <SkeletonContainer>
                  <Skeleton
                    height={23}
                    count={3}
                    style={{ marginBottom: "1rem" }}
                  />
                </SkeletonContainer>
              )}
              {!isLoading && (
                <NavLinks>
                  <Link to="/dashboard" onClick={handleClick}>
                    My Products
                  </Link>

                  {!isLoading && (
                    <Link to="/dashboard/my-bookings" onClick={handleClick}>
                      My Bookings
                    </Link>
                  )}
                  {!isLoading && data?.role !== "buyer" && (
                    <Link to="/dashboard/add-product" onClick={handleClick}>
                      Add a Product
                    </Link>
                  )}
                  {!isLoading && data?.role === "admin" && (
                    <Link to="/dashboard/all-sellers" onClick={handleClick}>
                      All Sellers
                    </Link>
                  )}
                  {!isLoading && data?.role === "admin" && (
                    <Link to="/dashboard/all-buyers" onClick={handleClick}>
                      All Buyers
                    </Link>
                  )}
                  {!isLoading && data?.role === "admin" && (
                    <Link to="/dashboard/reports" onClick={handleClick}>
                      Reports
                    </Link>
                  )}
                </NavLinks>
              )}
            </Container>
          )
      )}
    </Portal>
  );
}

export default DashDrawer;

const Container = styled(animated.div)`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  min-width: 280px;
  padding-left: 2rem;
  padding-right: var(--gip);
  background-image: var(--paper-4);
  padding-bottom: 1rem;
  padding-top: calc(64px + 1rem);
  z-index: 100;
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-left: 1rem;
  border: 1px solid hsl(var(--outline-variant) / 50%);
  align-items: center;
`;

const NavLinks = styled.nav`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const Link = styled(RrdLink)`
  font-size: 1.15rem;
  padding: 0.5em 1rem;
  border-radius: 1em;
  &:hover {
    background-color: hsl(var(--primary-main) / 10%);
  }
`;

const MainSection = styled.section`
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  @media ${device.md} {
    grid-column: 4/13;
    padding-block: 2rem;
    padding-left: 2rem;
    padding-right: var(--gip);
  }
`;

const Sidebar = styled.aside`
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  background-image: var(--paper-1);
  /* display: none; */
  position: fixed;
  top: 0;
  margin-top: 54px;
  width: 100%;
  max-width: 300px;
  height: 100%;
  z-index: 20;
  @media ${device.md} {
    margin-top: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    ${(p) => {
      if (p.theme.palette.mode === "dark") return css``;
      else
        return css`
          box-shadow: 15px 0 38px -30px hsl(var(--primary-hue) 80% 20%);
        `;
    }}
    grid-column: 1/4;
    padding-right: 1rem;
    padding-left: 2rem;
  }
`;

const Avatar = styled.img`
  /* margin-inline: auto; */
  /* margin-left: 1rem; */
  width: clamp(50px, 8vw, 80px);
  aspect-ratio: 1;
  border-radius: 50%;
`;

const Name = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  margin-block: 0.15rem;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-block: 0.15rem;
  padding-left: 1rem;
  margin-top: 1rem;
`;
