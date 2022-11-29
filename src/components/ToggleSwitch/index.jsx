import React from "react";
import styled, { css } from "styled-components";

function ToggleSwitch({ value, onChange }) {
  return (
    <Container value={value ? "on" : "off"}>
      <Thumb value={value ? "on" : "off"} />
    </Container>
  );
}

export default ToggleSwitch;

const Container = styled.button`
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 1rem;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--outline-variant));
  ${(p) => (p.value === "on" ? onContainerStyles : offContainerStyles)};
`;

const Thumb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  ${(p) => (p.value === "on" ? onStyles : offStyles)};
  transition: left 250ms ease-out, color 300ms ease;
`;

const onStyles = (p) => css`
  background-color: hsl(var(--bg));
  left: calc(100% - 18px);
`;
const offStyles = (p) => css`
  background-color: hsl(var(--bg));
`;

const onContainerStyles = (p) => css`
  background-color: hsl(var(--success-main));
`;

const offContainerStyles = (p) => css`
  background-color: hsl(240, 4.91803278688524%, 52.15686274509803%);
`;
