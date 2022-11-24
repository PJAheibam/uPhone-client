import styled, { css } from "styled-components";
export * from "./GradientButton";

const getColor = (p) => {
  if (!p.color) return "hsl(var(--on-primar${alpha})";
  switch (p.color) {
    case "primary":
      return "hsl(var(--on-primary))";
    case "secondary":
      return "hsl(var(--on-secondary))";

    case "error":
      return "hsl(var(--on-error))";
    case "success":
      return "hsl(var(--on-success))";
    case "warning":
      return "hsl(var(--on-warning))";
    case "info":
      return "hsl(var(--on-info))";
    default:
      return "hsl(var(--on-primary))";
  }
};
const getBgColor = (p) => {
  if (!p.color) return "hsl(var(--primary-dark))";
  switch (p.color) {
    case "primary":
      return "hsl(var(--primary-main))";
    case "secondary":
      return "hsl(var(--secondary-main))";

    case "error":
      return "hsl(var(--error-main))";
    case "success":
      return "hsl(var(--success-main))";
    case "warning":
      return "hsl(var(--warning-main))";
    case "info":
      return "hsl(var(--info-main))";
    default:
      return "hsl(var(--primary-main))";
  }
};
const getDarkBgColor = (p) => {
  if (!p.color) return "hsl(var(--primary-dark))";
  switch (p.color) {
    case "primary":
      return "hsl(var(--primary-dark))";
    case "secondary":
      return "hsl(var(--secondary-dark))";

    case "error":
      return "hsl(var(--error-dark))";
    case "success":
      return "hsl(var(--success-dark))";
    case "warning":
      return "hsl(var(--warning-dark))";
    case "info":
      return "hsl(var(--info-dark))";
    default:
      return "hsl(var(--primary-dark))";
  }
};
const getLightBgColor = (p) => {
  if (!p.color) return "hsl(var(--primary-light))";
  switch (p.color) {
    case "primary":
      return "hsl(var(--primary-light))";
    case "secondary":
      return "hsl(var(--secondary-light))";

    case "error":
      return "hsl(var(--error-light))";
    case "success":
      return "hsl(var(--success-light))";
    case "warning":
      return "hsl(var(--warning-light))";
    case "info":
      return "hsl(var(--info-light))";
    default:
      return "hsl(var(--primary-light))";
  }
};
const getSemiTransparentBgColor = (p) => {
  const alpha = "7%";
  if (!p.color) return `hsl(var(--primary-dark) / ${alpha})`;
  switch (p.color) {
    case "primary":
      return `hsl(var(--primary-main) / ${alpha})`;
    case "secondary":
      return `hsl(var(--secondary-main) / ${alpha})`;

    case "error":
      return `hsl(var(--error-main) / ${alpha})`;
    case "success":
      return `hsl(var(--success-main) / ${alpha})`;
    case "warning":
      return `hsl(var(--warning-main) / ${alpha})`;
    case "info":
      return `hsl(var(--info-main) / ${alpha})`;
    default:
      return `hsl(var(--primary-main) / ${alpha})`;
  }
};

const variantStyles = (p) => {
  if (!p.variant)
    return css`
      color: hsl(var(--text-primary));
      border: 1px solid ${getBgColor};
      background-color: transparent;
    `;

  switch (p.variant) {
    case "outlined":
      return css`
        background-color: transparent;
        color: ${getBgColor};
        border: 1px solid ${getBgColor};
      `;
    case "filled":
      return css`
        color: ${getColor};
        border: 1px solid ${getBgColor};
        background-color: ${getBgColor};
      `;
    case "text":
      return css`
        color: ${getBgColor};
        border: none;
        background-color: transparent;
      `;
    default:
      break;
  }
};

const variantHoverStyle = (p) => {
  if (!p.variant)
    return css`
      color: hsl(var(--text-primary));
      background-color: transparent;
    `;

  switch (p.variant) {
    case "outlined":
      return css`
        background-color: ${getSemiTransparentBgColor};
        color: ${p.theme.palette.mode === "dark"
          ? getLightBgColor
          : getDarkBgColor};
        border: 1px solid
          ${p.theme.palette.mode === "dark" ? getLightBgColor : getDarkBgColor};
      `;
    case "filled":
      return css`
        color: ${getColor};
        border: 1px solid ${getDarkBgColor};
        background-color: ${getDarkBgColor};
      `;
    case "text":
      return css`
        color: ${p.theme.palette.mode === "dark"
          ? getLightBgColor
          : getDarkBgColor};
        border: none;
        background-color: ${getSemiTransparentBgColor};
      `;
    default:
      return css`
        color: ${getColor};
        border: 1px solid ${getDarkBgColor};
        background-color: ${getDarkBgColor};
      `;
      break;
  }
};

export const Button = styled.button`
  will-change: border, color, background-color;
  cursor: ${(p) => (p.loading ? "wait" : "pointer")};
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  padding: 0.25em 0.75em;
  padding-bottom: 0.3em;
  border-radius: 1em;
  /* font-weight: 600; */
  ${(p) =>
    p.disabled &&
    css`
      filter: saturate(0.5);
      opacity: 0.45;
    `}
  transition: background-color 250ms ease, color 250ms ease, border 250ms ease;
  ${variantStyles}
  &:hover {
    ${(p) => (p.disabled ? null : variantHoverStyle)}
  }
  &:active {
    scale: 0.975;
  }
`;
