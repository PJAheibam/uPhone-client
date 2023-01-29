import React from "react";
import styled from "styled-components";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { device } from "../../utils/breakpoints";
import { Link } from "react-router-dom";

function SupportSection() {
  return (
    <Container>
      <Heading>WELCOME TO UPHONE SUPPORT. WE'RE HERE TO HELP.</Heading>
      <SubHeading>ALWAYS ON YOUR SIDE WHEN YOU NEED HELP</SubHeading>
      <Cards>
        <CardContainer as="a" href="tel:0000123456789">
          <CardIcon>
            <FiPhoneCall />
          </CardIcon>
          <CardContent>
            <CardHeading>Wanna talk to us?</CardHeading>
            <CardTitle>Call us now</CardTitle>
            <CardText>This Number is Toll Free.</CardText>
            <CardText>0000-123-456789</CardText>
          </CardContent>
        </CardContainer>

        {/* Email */}
        <CardContainer as="a" href="mailTo:support@uphone.web.app">
          <CardIcon>
            <MdOutlineEmail />
          </CardIcon>
          <CardContent>
            <CardHeading>Have any doubts?</CardHeading>
            <CardTitle>Email us now</CardTitle>
            <CardText>24/7 Customer Service </CardText>
            <CardText>support@uphone.web.app</CardText>
          </CardContent>
        </CardContainer>
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

const CardIcon = styled.div`
  font-size: 3rem;
  display: flex;
  transition: color 250ms ease;
`;

const CardContent = styled.div``;
const CardHeading = styled.h2`
  text-transform: uppercase;
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 500;
  text-align: center;
  @media ${device.sm} {
    text-align: left;
  }
`;
const CardTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2rem);
  transition: color 250ms ease;
  @media ${device.sm} {
    text-align: left;
  }
`;

const CardText = styled.p`
  text-align: center;
  @media ${device.sm} {
    text-align: left;
  }
`;

const CardContainer = styled.div`
  padding: 1rem;
  gap: 1rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid hsl(var(--outline));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :hover {
    border: 1px solid hsl(var(--primary-main));
  }
  :hover ${CardTitle}, :hover ${CardIcon} {
    color: hsl(var(--primary-main));
  }
  @media ${device.sm} {
    gap: 2rem;
    flex-direction: row;
    justify-content: flex-start;
  }
`;
