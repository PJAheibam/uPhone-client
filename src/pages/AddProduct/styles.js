import styled from "styled-components";
import { Input } from "../../components/formItems";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Block = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const Heading = styled.h1`
  font-size: clamp(1.15rem, 5vw, 2.15rem);
  margin-bottom: 0.5em;
  text-transform: capitalize;
`;

export const TextArea = styled(Input)`
  resize: vertical;
  font-family: inherit;
`;
