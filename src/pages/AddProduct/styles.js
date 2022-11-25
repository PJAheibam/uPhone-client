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
  width: 100%;
  height: 200px;
  padding: 1rem;
  background-image: url(${uploadImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid hsl(var(--outline-variant));
  border-radius: var(--border-radius-md);
  overflow: hidden;
  input[type="file"] {
    display: none;
    pointer-events: none;
  }
  &::before {
    position: absolute;
    /* content: attr(data-file-name); */
    content: "file name";
    width: 100%;
    bottom: -2px;
    left: 0%;
    text-align: center;
    padding: 0.5em 1em;
    height: fit-content;
    background-color: gray;
    /* background-color: hsl(var(--background)); */
  }
  &:hover {
    border: 1px solid hsl(var(--outline));
  }
`;
