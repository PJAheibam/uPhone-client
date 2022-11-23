import styled from "styled-components";
import { device } from "../../utils/breakpoints";

export const Container = styled.article`
  /* height: 100%; */
  min-height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.section`
  padding: 1rem;
  height: fit-content;
  background-image: var(--paper-2);
  padding-inline: var(--gip);
  @media ${device.sm} {
    border-radius: var(--border-radius-lg);
    min-width: 400px;
  }
`;

export const Form = styled.form``;

export const Heading = styled.h1`
  text-align: center;
  font-size: 1.25rem;
`;
