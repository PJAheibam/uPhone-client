import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoints";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: calc(100vh - 55px);
  max-width: ${breakpoint.xxl + "px"};
  margin-inline: auto;
`;
