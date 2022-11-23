import { Link } from "react-router-dom";
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
  min-width: 100%;
  height: 100%;
  /* margin-block: 0; */
  /* background-image: var(--paper-1); */
  padding-inline: var(--gip);
  @media ${device.sm} {
    box-shadow: var(--box-shadow-sm);
    margin-block: 2rem;
    padding-inline: 2rem;
    border-radius: var(--border-radius-lg);
    background-image: var(--paper-2);
    min-width: 400px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const BoxFooterText = styled.p`
  text-align: center;
  color: hsl(var(--text-secondary));
`;

export const LinkText = styled(Link)`
  color: ${(p) =>
    p.theme.palette.mode === "dark"
      ? "hsl(var(--primary-dark))"
      : "hsl(var(--primary-main))"};
  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    color: ${(p) =>
      p.theme.palette.mode === "dark"
        ? "hsl(var(--primary-main))"
        : "hsl(var(--primary-dark))"};
  }
`;
