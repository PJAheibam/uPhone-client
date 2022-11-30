import styled from "styled-components";

export const Container = styled.section``;

export const Heading = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const Thumb = styled.img`
  height: 40px;
  width: 40px;
  border-radius: var(--border-radius-md);
  object-fit: cover;
  object-position: center;
  overflow: hidden;
`;

export const Product = styled.figure`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
