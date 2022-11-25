import styled, { css } from "styled-components";

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.p`
  font-size: 0.9rem;
  width: 100%;
  text-transform: capitalize;
`;

export const Input = styled.input.attrs((p) => ({
  type: p.type || "text",
  autoComplete: p.autoComplete || "off",
}))`
  color: hsl(var(--text-primary));
  font-size: 1.15rem;
  padding: 0.35rem 1rem;
  width: 100%;
  border-radius: var(--border-radius-sm);
  outline: 3px solid transparent;
  border: 1.5px solid
    ${(p) => (p.error ? "hsl(var(--error-main) / 70%)" : "hsl(var(--outline))")};
  background-color: inherit;
  transition: border 200ms ease, outline 200ms ease;
  &:hover {
    border: 1.5px solid
      ${(p) => (p.error ? "hsl(var(--error-main))" : "hsl(var(--outline))")};
  }
  &:focus-visible {
    border: 1.5px solid
      ${(p) =>
        p.error ? "hsl(var(--error-main))" : "hsl(var(--primary-main))"};
    outline: 3px solid
      ${(p) =>
        p.error
          ? "hsl(var(--error-main) / 35%)"
          : "hsl(var(--primary-main) / 40%)"};
    outline-offset: 0;
  }
`;

export const HelperText = styled.p`
  display: block;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  border-radius: var(--border-radius-sm);
  ${(p) => {
    if (p.type === "error")
      return css`
        background-color: hsl(var(--error-main) / 10%);
        color: hsl(var(--error-main));
      `;
    return css`
      /* border: 1px solid hsl(var(--text-secondary)); */
      background-image: var(--paper-5);
      color: hsl(var(--text-secondary));
    `;
  }}
`;
