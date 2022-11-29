import React, { useState } from "react";
import styled from "styled-components";
import { GradientButton } from "../../components/Button";
import subsAnimated from "../../assets/images/subscriber-animate.svg";
import { device } from "../../utils/breakpoints";
import { toast } from "react-hot-toast";

function Newsletter() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = toast.loading("Subscribing...");
    await new Promise(() =>
      setTimeout(() => {
        setLoading(false);
        toast.success("Subscribed", { id });
      }, 1000)
    );
  };

  return (
    <Container>
      <Image src={subsAnimated} />
      <Content>
        <Heading>Newsletter</Heading>
        <SubHeading>
          Do you want early updates and exclusive offers on the latest drops?
        </SubHeading>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your email"
          />
          <Button type="submit">Subscribe</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Newsletter;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-inline: var(--gip);
  padding-block: 2rem;
  background-image: var(--paper-1);
  @media ${device.md} {
    gap: 3rem;
    flex-direction: row;
  }
`;

const Content = styled.section`
  position: relative;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  @media ${device.md} {
    align-items: flex-start;
    margin-block: auto;
    margin-right: auto;
    /* flex-direction: row; */
    /* justify-content: flex-start; */
  }
`;

const Heading = styled.h1`
  /* text-align: center; */
  font-weight: 500;
  font-size: clamp(1.75rem, 4vw, 2rem);
`;

const SubHeading = styled.p`
  max-width: 500px;
  text-align: center;
  font-size: clamp(1.15rem, 4vw, 1.5rem);
  color: hsl(var(--text-secondary));
  /* margin-inline: auto; */
  @media ${device.md} {
    text-align: left;
  }
`;

const Form = styled.form`
  max-width: 800px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media ${device.sm} {
    flex-direction: row;
  }
`;

const Input = styled.input`
  font-size: 1.15rem;
  padding: 0.25em 1em;
  width: 100%;
  border-radius: 1rem;
  background-color: transparent;
  border: 2px solid hsl(var(--outline-variant));
`;

const Image = styled.img`
  height: 300px;
  @media ${device.sm} {
    margin-left: auto;
  }
`;

const Button = styled(GradientButton)`
  width: fit-content;
  margin-inline: auto;
`;
