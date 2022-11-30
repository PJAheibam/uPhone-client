import React from "react";
import styled, { css } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { device } from "../utils/breakpoints";
import userIcon from "../assets/icons/user.png";
import { Link as RrdLink, Outlet } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Badge } from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import useUserRole from "../hooks/useUserRole";

function DashboardLayout() {
  const { user } = useAuth();

  const { data, isLoading } = useUserRole(user?.uid);

  return (
    <>
      <Navbar />
      <Container>
        <Sidebar>
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
              <Link to="/dashboard">My Products</Link>

              {!isLoading && (
                <Link to="/dashboard/my-bookings">My Bookings</Link>
              )}
              {!isLoading && data?.role !== "buyer" && (
                <Link to="/dashboard/add-product">Add a Product</Link>
              )}
              {!isLoading && data?.role === "admin" && (
                <Link to="/dashboard/manage-users">Manage Users</Link>
              )}
            </NavLinks>
          )}
        </Sidebar>
        <MainSection>
          <Outlet />
        </MainSection>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardLayout;

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  min-height: calc(100vh - 55px);
  max-width: 1366px;
  margin-inline: auto;
  padding-top: 53px;
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
  display: flex;
  flex-direction: column;
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

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-block: 0.15rem;
  padding-left: 1rem;
  margin-top: 1rem;
`;

const Name = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  margin-block: 0.15rem;
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-left: 1rem;
  border: 1px solid hsl(var(--outline-variant) / 50%);
  align-items: center;
`;
