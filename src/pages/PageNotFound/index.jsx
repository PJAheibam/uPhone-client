import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fourOfour from "../../assets/images/404.svg";
import { GradientButton } from "../../components/Button";

function PageNotFound() {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }
  return (
    <Container>
      <Image src={fourOfour} alt="page not found" />
      <GradientButton onClick={handleGoBack}>Go Back</GradientButton>
    </Container>
  );
}

export default PageNotFound;

const Container = styled.article`
  padding-inline: var(--gip);
  padding-block: 2rem;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50%;
`;
