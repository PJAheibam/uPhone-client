import { Link } from "react-router-dom";
import styled from "styled-components";

function Logo({ style }) {
  return (
    <Container style={style} to="/">
      UPHONE
    </Container>
  );
}

export default Logo;

const Container = styled(Link)`
  background: -webkit-linear-gradient(
    45deg,
    hsl(var(--primary-light)),
    hsl(var(--primary-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 600;
`;
