import styled, { css } from "styled-components";

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.p`
  font-size: 0.9rem;
  width: 100%;
`;

export const Input = styled.input.attrs((p) => ({
  type: p.type || "text",
  autoComplete: p.autoComplete || "off",
}))`
  color: hsl(var(--text-primary));
  font-size: 1.15rem;
  padding: 0.35rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid hsl(var(--outline));
  width: 100%;
  background-color: inherit;
  &:focus-visible {
    border: 1px solid hsl(var(--primary-main));
    outline: 3px solid hsl(var(--primary-main) / 40%);
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
