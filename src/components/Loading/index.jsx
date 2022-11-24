import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

function Loading() {
  return (
    <Container>
      <PuffLoader color="#288bff" size={100} />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 55px);
`;
