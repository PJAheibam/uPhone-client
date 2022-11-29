import React from "react";
import { GradientButton, Button } from "../Button";
import styled from "styled-components";
import {
  FiFacebook as Fb,
  FiLinkedin as Linkedin,
  FiTwitter as Twitter,
  FiInstagram as Insta,
} from "react-icons/fi";

function Socials() {
  const styles = {
    padding: "0.25rem",
  };
  const variant = "filled";
  return (
    <Container>
      <Button variant={variant} style={styles}>
        <Fb />
      </Button>
      <Button variant={variant} style={styles}>
        <Linkedin />
      </Button>
      <Button variant={variant} style={styles}>
        <Twitter />
      </Button>
      <Button variant={variant} style={styles}>
        <Insta />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export default Socials;
