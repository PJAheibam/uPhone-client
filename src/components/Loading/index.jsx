import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

function Loading() {
  return (
    <Container>
      <PuffLoader />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
