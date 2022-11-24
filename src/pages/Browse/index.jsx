import React from "react";
import styled from "styled-components";
import { device } from "../../utils/breakpoints";
import Sidebar from "./Sidebar";

function Browse() {
  return (
    <Container>
      <Sidebar />
      <MainSection>Main</MainSection>
    </Container>
  );
}

export default Browse;

const Container = styled.article`
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
