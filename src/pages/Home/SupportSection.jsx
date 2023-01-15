import React from "react";
import styled from "styled-components";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { device } from "../../utils/breakpoints";

function SupportSection() {
  return (
    <Container>
      <Heading>WELCOME TO UPHONE SUPPORT. WE'RE HERE TO HELP.</Heading>
      <SubHeading>ALWAYS ON YOUR SIDE WHEN YOU NEED HELP</SubHeading>
      <Cards>
        <Card.Container>
          <Card.Icon>
            <FiPhoneCall />
          </Card.Icon>
          <Card.Content>
            <Card.Heading>Wanna talk to us?</Card.Heading>
            <Card.Title>Call us now</Card.Title>
            <Card.Text>This Number is Toll Free.</Card.Text>
            <Card.Text>0000-123-456789</Card.Text>
          </Card.Content>
        </Card.Container>
        <Card.Container>
          <Card.Icon>
            <MdOutlineEmail />
          </Card.Icon>
          <Card.Content>
            <Card.Heading>Have any doubts?</Card.Heading>
            <Card.Title>Email us now</Card.Title>
            <Card.Text>24/7 Customer Service </Card.Text>
            <Card.Text>support@uphone.web.app</Card.Text>
          </Card.Content>
        </Card.Container>
      </Cards>
    </Container>
  );
}

export default SupportSection;

const Container = styled.section`
  padding-inline: var(--gip);
  padding-block: 2rem;
`;
const Heading = styled.h2`
  text-transform: uppercase;
  text-align: center;
  font-size: clamp(1.25rem, 5vw, 2.25rem);
`;
const SubHeading = styled.h4`
  text-transform: uppercase;
  text-align: center;
  font-size: clamp(0.75rem, 3vw, 1.75rem);
  font-weight: normal;
`;

const Cards = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media ${device.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = {
  Container: styled.div`
    padding: 1rem;
    gap: 1rem;
    border-radius: var(--border-radius-lg);
    outline: 1px solid hsl(var(--outline));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${device.sm} {
      gap: 2rem;
      flex-direction: row;
      justify-content: flex-start;
    }
  `,
  Icon: styled.div`
    font-size: 3rem;
    display: flex;
  `,
  Content: styled.div``,
  Heading: styled.h2`
    text-transform: uppercase;
    font-size: clamp(1rem, 4vw, 1.25rem);
    font-weight: 500;
    text-align: center;
    @media ${device.sm} {
      text-align: left;
    }
  `,
  Title: styled.h1`
    text-transform: uppercase;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2rem);
    @media ${device.sm} {
      text-align: left;
    }
  `,
  Text: styled.p`
    text-align: center;
    @media ${device.sm} {
      text-align: left;
    }
  `,
};
