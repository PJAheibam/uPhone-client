import styled from "styled-components";

export const ToggleButtonGroup = styled.div`
  padding: 0.15rem;
  display: grid;
  /* height: fit-content; */
  /* place-items: center; */
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  border: 1rem;
  font-size: 1.15rem;
  border-radius: 1.5rem;
  border: 1px solid hsl(var(--outline-variant));
`;

export const ToggleButton = styled.button.attrs((p) => ({
  type: "button",
}))`
  font-size: inherit;
  padding: 0.25em 1em;
  border-radius: inherit;
  color: hsl(var(--primary-main));

  border: 1px solid
    ${(p) => (p.active ? "hsl(var(--primary-main) / 20%)" : "transparent")};
  background-color: ${(p) =>
    p.active ? "hsl(var(--primary-main) / 20%)" : "transparent"};
  &:hover {
    background-color: ${(p) =>
      p.active
        ? "hsl(var(--primary-main) / 20%)"
        : "hsl(var(--primary-main) / 10%)"};
  }
`;
