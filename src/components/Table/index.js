import styled, { css } from "styled-components";

const commonStyle = (p) => css`
  font-size: 1.15rem;
  padding: 0.5em 1em;
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
const Body = styled.tbody``;

const Heading = styled.th`
  ${commonStyle}
  font-weight: 500;
  background-image: var(--paper-3);
`;

const Data = styled.td`
  ${commonStyle}
`;

export const More = styled.td`
  cursor: pointer;
  position: absolute;
  font-size: 1.35rem;
  height: 100%;
  width: fit-content;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-inline: 0.5rem;
  opacity: 0;
  /* background-color: blue; */
  /* transition: opacity 200ms ease; */
  z-index: 200;
`;

export const Icon = styled.button`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  padding: 0.25rem;
  min-width: 33px;
  min-height: 33px;
  border-radius: 50%;
  &:hover {
    /* filter: brightness(1.1); */
    background-image: var(--paper-5);
  }
`;

const Row = styled.tr`
  position: relative;
  &:hover {
    background-image: var(--paper-1);
  }
  &:hover ${More} {
    opacity: 1;
  }
`;

export const T = { Head, Body, Heading, Data, Row };
