import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GradientButton } from "../Button";
import Logo from "../Logo";
import NavLinks, { NavLink } from "./NavLinks";
import { AuthButtonGroup, Header, Wrapper } from "./styles";
import ToggleThemeButton from "./ToggleThemeButton";
// import UserMenu from "./UserMenu";

function Navbar() {
  const { user } = useAuth();
  return (
    <Header>
      <Wrapper>
        <Logo />
        <NavLinks />
        <ToggleThemeButton />
        {!user.uid && (
          <AuthButtonGroup>
            <NavLink to="/login"> Login</NavLink>
            <GradientButton as={Link} to="/register" color="primary">
              Register
            </GradientButton>
          </AuthButtonGroup>
        )}
        {/* <UserMenu /> */}
      </Wrapper>
    </Header>
  );
}

export default Navbar;
