import React from "react";
import {
  Header,
  BrandsWrapper,
  CopyRight,
  FooterContainer,
  Heading,
  Nav,
  NavLink,
  SupportWrapper,
  Text,
  UsefullWrapper,
  Wrapper,
} from "./styles";
import Logo from "../Logo";
import Socials from "./Socials";

function Footer() {
  return (
    <FooterContainer>
      <Wrapper>
        <Header>
          <Logo />
          <Text>Pick from great variety at great price.</Text>
          <Socials />
        </Header>
        <UsefullWrapper>
          <Nav>
            <Heading>Usefull Links</Heading>
            <NavLink>Home</NavLink>
            <NavLink>Browse</NavLink>
            <NavLink>Blog</NavLink>
          </Nav>
        </UsefullWrapper>
        <BrandsWrapper>
          <Nav>
            <Heading>Brands</Heading>
            <NavLink>iPhone</NavLink>
            <NavLink>Samsung</NavLink>
            <NavLink>Realme</NavLink>
            <NavLink>Redmi</NavLink>
            <NavLink>vivo</NavLink>
          </Nav>
        </BrandsWrapper>
        <SupportWrapper>
          <Nav>
            <Heading>Supports</Heading>
            <NavLink>Terms & Conditions</NavLink>
            <NavLink>About</NavLink>
            <NavLink>FAQ</NavLink>
          </Nav>
        </SupportWrapper>

        <CopyRight>Copyright &copy;2022 uPhone</CopyRight>
      </Wrapper>
    </FooterContainer>
  );
}

export default Footer;
