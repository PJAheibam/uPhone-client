import styled, { css } from "styled-components";

const commonStyle = (p) => css`
  font-size: 1.15rem;
  padding: 0.35em 1em;
  text-align: left;
  border-bottom: 1px solid hsl(var(--outline-variant) / 50%);
`;

export const Table = styled.table`
  overflow: hidden;
  border-radius: var(--border-radius-md);
  border-collapse: collapse;
  width: 100%;
`;

const Head = styled.thead``;
const Body = styled.tbody`
  &:hover {
    background-image: var(--paper-3);
  }
`;

const Heading = styled.th`
  ${commonStyle}
  background-image: var(--paper-2);
`;

const Data = styled.td`
  ${commonStyle}
`;

const Row = styled.tr``;

export const T = { Head, Body, Heading, Data, Row };
