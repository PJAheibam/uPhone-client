import styled from "styled-components";
import oops from "../../../../assets/images/oops.svg";

function Oops() {
  return (
    <Container>
      <Image src={oops} alt="Oops!" />
      <Text>No product found!</Text>
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
  color: hsl(var(--warning-main));
  font-size: clamp(1rem, 3vw, 1.25rem);
`;
