import { animated } from "react-spring";
import styled, { css } from "styled-components";

const optionCommonStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.15rem;
  padding: 0.35rem 1rem;
  width: 100%;
  text-transform: none;
`;

export const Container = styled.div`
  position: relative;
  /* z-index: 100; */
`;

export const Select = styled.button.attrs((p) => ({
  type: "button",
}))`
  ${optionCommonStyles}
  border: 1.5px solid hsl(var(--outline));
  border-radius: var(--border-radius-sm);
  justify-content: space-between;
  &:hover {
    background-image: var(--paper-1);
  }
`;

export const Label = styled.span``;

export const Options = styled.div`
  background-image: var(--paper-2);
`;

export const Option = styled.button.attrs((p) => ({
  type: "button",
}))`
  ${optionCommonStyles}
  width: 100%;
  border-bottom: 1px solid hsl(var(--outline-variant));
  &:nth-last-child(1) {
    border-bottom: 1px solid hsl(var(--outline-variant) / 0%);
  }
  &:hover {
    background-image: var(--paper-3);
  }
  &:active {
    background-image: ${(p) =>
      p.theme.palette.mode === "dark" ? "var(--paper-2)" : "var(--paper-5)"};
  }
  &:focus {
    /* border: none; */
    outline: none;
    background-image: linear-gradient(
      90deg,
      hsl(var(--primary-main) / 1%) 10%,
      hsl(var(--primary-main) / 22%),
      hsl(var(--primary-main) / 1%) 90%
    );
  }
`;

export const OptionsWrapper = styled(animated.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  margin-top: 8px;
  z-index: 100;
`;

export const Icon = styled(animated.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
`;
