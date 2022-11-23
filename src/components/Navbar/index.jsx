import React from "react";
import { Button } from "../button";
import { GradientButton } from "../button/GradientButton";
import NavLinks from "./NavLinks";
import { Header, Wrapper } from "./styles";
import ToggleThemeButton from "./ToggleThemeButton";
import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <Header>
      <Wrapper>
        <span style={{ marginRight: "auto" }}>Logo</span>
        <NavLinks />
        <ToggleThemeButton />
        <Button variant="text" color="primary">
          Login
        </Button>
        {/* <Button variant="filled" color="primary">
          register
        </Button> */}
        <GradientButton color="primary">Register</GradientButton>
        <UserMenu />
      </Wrapper>
    </Header>
  );
}

export default Navbar;
