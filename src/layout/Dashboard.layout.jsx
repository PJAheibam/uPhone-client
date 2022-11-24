import React from "react";
import styled, { css } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { device } from "../utils/breakpoints";
import userIcon from "../assets/icons/user.png";
import { Link as RrdLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Sidebar>
          <Avatar src={userIcon} alt="User avatar" />
          <NavLinks>
            <Link to="/dashboard/add-product">Add a Product</Link>
            <Link to="/dashboard/my-products">My Products</Link>
          </NavLinks>
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
`;

const MainSection = styled.section`
  grid-column: 1/13;
  padding-block: 2rem;
  padding-inline: var(--gip);
  @media ${device.md} {
    grid-column: 4/12;
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
    padding-left: var(--gip);
  }
`;

const Avatar = styled.img`
  /* margin-inline: auto; */
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
  padding: 0.5em 1em;
  border-radius: 1em;
  &:hover {
    background-color: hsl(var(--primary-main) / 10%);
  }
`;
