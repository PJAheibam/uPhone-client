import styled, { css } from "styled-components";

const getBgColor = (p) => {
  if (!p.color)
    return css`
      color: hsl(var(--text-secondary));
      background-color: hsl(var(--outline-variant) / 50%);
    `;
  switch (p.color) {
    case "primary":
      return css`
        color: hsl(var(--primary-main));
        background-color: hsl(var(--primary-main) / 13%);
      `;
    case "secondary":
      return css`
        color: hsl(var(--secondary-main));
        background-color: hsl(var(--secondary-main) / 10%);
      `;
    case "warning":
      return css`
        color: hsl(var(--warning-main));
        background-color: hsl(var(--warning-main) / 15%);
      `;
    case "error":
      return css`
        color: hsl(var(--error-main));
        background-color: hsl(var(--error-main) / 15%);
      `;
    case "success":
      return css`
        color: hsl(var(--success-main));
        background-color: hsl(var(--success-main) / 15%);
      `;
    case "info":
      return css`
        color: ${p.theme.palette.mode === "dark"
          ? "hsl(var(--info-main))"
          : "hsl(var(--info-dark))"};
        background-color: hsl(var(--info-main) / 15%);
      `;
  }
};

export const Badge = styled.span`
  font-size: 0.75rem;
  letter-spacing: 1px;
  border-radius: 1em;
  padding: 0.25em 0.75em;
  text-align: center;
  width: fit-content;
  text-transform: uppercase;
  ${getBgColor}/* background-color: ; */
`;
