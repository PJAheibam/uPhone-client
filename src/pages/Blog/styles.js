import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  padding-inline: var(--gip);
  padding-block: 2rem;
`;

export const Article = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const Title = styled.h2`
  font-weight: 500;
  margin-bottom: 0.5em;
`;

export const Text = styled.p`
  /* color: hsl(var(--text-secondary)); */
  line-height: 1.5rem;
`;
