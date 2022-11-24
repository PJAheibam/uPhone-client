import React from "react";
import styled from "styled-components";

function OrDevider() {
  return (
    <Container>
      <Line /> <Text>or</Text> <Line />{" "}
    </Container>
  );
}

export default OrDevider;

const Container = styled.div`
  font-size: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-block: 0.35em;
`;

const Text = styled.span`
  display: block;
  padding-inline: 0.5em;
  color: hsl(var(--text-secondary));
`;

const Line = styled.span`
  width: 100%;
  display: block;
  height: 0.1em;
  background-color: hsl(var(--outline-variant));
`;
