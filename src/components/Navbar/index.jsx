import React from "react";
import { Link } from "react-router-dom";
import { Button, GradientButton } from "../Button";
import Logo from "../Logo";
import NavLinks, { NavLink } from "./NavLinks";
import { Header, Wrapper } from "./styles";
import ToggleThemeButton from "./ToggleThemeButton";
import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <Header>
      <Wrapper>
        <Logo style={{ marginRight: "auto" }} />
        <NavLinks />
        <ToggleThemeButton />
        <NavLink to="/login"> Login</NavLink>
        <GradientButton as={Link} to="/register" color="primary">
          Register
        </GradientButton>
        {/* <UserMenu /> */}
      </Wrapper>
    </Header>
  );
}

export default Navbar;
