import styled, { css } from "styled-components";

const primaryGradient = css`
  color: hsl(222 76% 98%);
  background-image: linear-gradient(
    -45deg,
    hsl(250, 60%, 59%) 0%,
    hsl(225, 76%, 67%) 51%,
    hsl(230, 70%, 59%) 100%
  );
`;
const errorGradient = css`
  background-image: linear-gradient(
    -45deg,
    #cb2d3e 0%,
    #ef473a 51%,
    #cb2d3e 100%
  );
  color: hsl(354 64% 97%);
`;
const successGradient = css`
  background-image: linear-gradient(
    -45deg,
    hsl(99, 42%, 45%) 0%,
    hsl(98, 40%, 60%) 51%,
    hsl(99, 42%, 45%) 100%
  );
  color: hsl(99 42% 97%);
`;
const warningGradient = css`
  background-image: linear-gradient(
    -45deg,
    hsl(35, 88%, 52%) 0%,
    hsl(45, 80%, 59%) 51%,
    hsl(35, 88%, 52%) 100%
  );
  color: hsl(54 80% 95%);
`;
const infoGradient = css`
  background-image: linear-gradient(
    -45deg,
    hsl(205, 100%, 56%) 0%,
    hsl(189, 96%, 53%) 51%,
    hsl(205, 100%, 56%) 100%
  );
  color: hsl(205, 100%, 95%);
`;

const getGradient = (p) => {
  switch (p.color) {
    case "primary":
      return primaryGradient;
    case "secondary":
      return primaryGradient;
    case "error":
      return errorGradient;
    case "success":
      return successGradient;
    case "info":
      return infoGradient;
    case "warning":
      return warningGradient;
    default:
      return primaryGradient;
  }
};

export const GradientButton = styled.button`
  will-change: background-position;
  ${getGradient}
  background-size: 200% auto;
  background-position: right center;
  font-size: 1.2rem;
  padding: 0.35em 1em;
  padding-bottom: 0.375rem;
  text-transform: capitalize;
  border-radius: 1em;
  transition: background-position 500ms ease;
  &:hover {
    background-position: left center;
  }
`;
