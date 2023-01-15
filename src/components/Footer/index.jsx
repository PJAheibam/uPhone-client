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
import { useBrands } from "../../hooks/useBrands";

function Footer() {
  const { data: brands = [] } = useBrands();
  // console.info(brands);
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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/category/all">Browse</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </Nav>
        </UsefullWrapper>
        <BrandsWrapper>
          <Nav>
            <Heading>Brands</Heading>
            {brands.slice(0, 6).map((brand) => (
              <NavLink key={brand._id} to={`/category/${brand._id}`}>
                {brand.name}
              </NavLink>
            ))}
          </Nav>
        </BrandsWrapper>
        <SupportWrapper>
          <Nav>
            <Heading>Supports</Heading>
            <NavLink>Terms & Conditions</NavLink>
            <NavLink>About</NavLink>
            {/* <NavLink to="/faq">FAQ</NavLink> */}
          </Nav>
        </SupportWrapper>

        <CopyRight>Copyright &copy;2022 uPhone</CopyRight>
      </Wrapper>
    </FooterContainer>
  );
}

export default Footer;
