import { animated } from "react-spring";
import styled from "styled-components";

export const MenuBtnContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

export const MenuContainer = styled(animated.div)`
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 1.15rem;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-image: var(--paper-3);
  box-shadow: var(--box-shadow-sm);
  border-top: 1px solid hsl(var(--outline-variant));
  border-left: 1px solid hsl(var(--outline-variant));
`;

export const MenuItem = styled.button`
  display: flex;
  width: 100%;
  white-space: nowrap;
  align-items: center;
  gap: 1rem;
  font-size: inherit;
  padding: 0.35em 1em;
  color: hsl(var(--text-secondary));
  background-image: inherit;
  &:hover {
    background-image: var(--paper-5);
  }
`;

export const MenuText = styled.span`
  text-transform: capitalize;
  font-size: inherit;
`;
