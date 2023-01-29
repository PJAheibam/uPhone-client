import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.article`
  padding-inline: var(--gip);
  padding-block: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Heading = styled.h1`
  text-transform: uppercase;
  font-size: clamp(1.25rem, 5vw, 2.25rem);
  text-align: center;
`;

export const HeaderButton = styled(motion.button)`
  position: relative;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.25em 0.75em;
  /* background-image: var(--paper-3); */
  /* border: 1px solid hsl(var(--outline-variant) / 50%); */
  border-radius: 1.5em;
  &:hover {
    background-image: var(--paper-5);
  }
  &:active {
    scale: 0.99;
  }
`;

export const Header = styled.section`
  display: flex;
  margin-inline: auto;
`;

export const ActiveIndicator = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: hsl(var(--primary-main));
`;
