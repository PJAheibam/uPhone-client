import styled from "styled-components";

export const ToggleButtonGroup = styled.div`
  position: relative;
  padding: 0.15rem;
  display: grid;
  min-width: fit-content;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  border: 1rem;
  font-size: 1.15rem;
  border-radius: 1.5rem;
  border: 1px solid hsl(var(--outline-variant));
  z-index: 5;
`;

export const ToggleButton = styled.button.attrs((p) => ({
  type: "button",
}))`
  font-size: inherit;
  padding: 0.25em 1em;
  border-radius: inherit;
  color: hsl(var(--primary-main));
  &:hover {
    background-color: hsl(var(--primary-light) / 10%);
  }
`;

export const ActiveBg = styled.div`
  position: absolute;
  top: 0;
  left: ${(p) => p.left + "px"};
  height: calc(100% - 0.29rem);
  margin-top: 0.15rem;
  /* margin: 0.15rem; */
  width: ${(p) => (p.width ? p.width + "px" : 0)};
  border-radius: inherit;
  border: 1px solid hsl(var(--primary-main) / 20%);
  background-color: hsl(var(--primary-main) / 20%);
  transition: left 350ms cubic-bezier(0.19, 0.39, 0.54, 1.02);
  /* background-color: blue; */
  z-index: -1;
`;
