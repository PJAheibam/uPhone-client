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
  gap: 0.5rem;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const Title = styled.h2`
  font-weight: 500;
  margin-bottom: 0.25em;
  font-size: 1.75rem;
`;

export const Text = styled.div`
  color: hsl(var(--text-primary) / 95%);
  font-size: 1.05rem;
  line-height: 1.65rem;
  letter-spacing: 1px;
`;
