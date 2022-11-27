import React from "react";
import styled from "styled-components";
import fourOfour from "../../assets/images/404.svg";

function PageNotFound() {
  return (
    <Container>
      <Image src={fourOfour} alt="page not found" />
    </Container>
  );
}

export default PageNotFound;

const Container = styled.article`
  padding-inline: var(--gip);
  padding-block: 2rem;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50%;
`;
