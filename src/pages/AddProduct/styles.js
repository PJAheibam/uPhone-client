import styled from "styled-components";
import { Input, InputWrapper } from "../../components/formItems";
import { device } from "../../utils/breakpoints";
import uploadImg from "../../assets/images/upload-image.svg";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Block = styled.div`
  display: grid;
  /* align-items: center; */
  gap: 1.5rem;
  grid-template-columns: 1fr;
  @media ${device.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Heading = styled.h1`
  font-size: clamp(1.15rem, 5vw, 2.15rem);
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;

export const TextArea = styled(Input)`
  resize: vertical;
  font-family: inherit;
`;

export const UploadImage = styled(InputWrapper)`
  position: relative;
  cursor: pointer;
  font-size: 2.5rem;
  color: hsl(var(--primary-main));
  margin-inline: auto;
  width: fit-content;
  padding: 1rem;
  border: 1px solid hsl(var(--outline-variant));
  border-radius: var(--border-radius-md);
  overflow: hidden;
  input[type="file"] {
    display: none;
    pointer-events: none;
  }
  &:hover {
    border: 1px solid hsl(var(--outline));
  }
`;
