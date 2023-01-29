import styled from "styled-components";
import { TiWarningOutline as WarnIcon } from "react-icons/ti";
import oops from "../../../../assets/images/oops.svg";

function Oops() {
  return (
    <Container>
      <Image src={oops} alt="Oops!" />
      <Alert>
        <WarnIcon size={25} />
        <Text>No product found!</Text>
      </Alert>
    </Container>
  );
}

export default Oops;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const Image = styled.img`
  width: clamp(200px, 80%, 350px);
`;

const Text = styled.em`
  color: inherit;
  font-size: clamp(1rem, 3vw, 1.25rem);
`;

const Alert = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: hsl(var(--warning-main));
  background-color: hsl(var(--warning-main) / 5%);
  padding: 0.5em 1em;
  border-radius: var(--border-radius-md);
`;
