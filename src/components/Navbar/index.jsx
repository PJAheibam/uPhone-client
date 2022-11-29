import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GradientButton } from "../Button";
import Logo from "../Logo";
import NavLinks, { NavLink } from "./NavLinks";
import { AuthButtonGroup, Header, Wrapper } from "./styles";
import ToggleThemeButton from "./ToggleThemeButton";
// import UserMenu from "./UserMenu";
import { Spin as Hamburger } from "hamburger-react";
import { useBreakpoint, useBreakpoints } from "react-use-size";
import Drawer from "./Drawer";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [hideRegister, hideLogin, hideLink] = useBreakpoints([410, 529, 725]);

  // auto close navmenu on large display
  useEffect(() => {
    if (!hideLink) {
      setOpen(false);
    }
  }, [hideLink]);
  return (
    <Header>
      <Wrapper>
        <Logo style={{ marginRight: "auto" }} />
        {!hideLink && <NavLinks />}
        {!hideRegister && <ToggleThemeButton />}
        {!user.uid && (
          <AuthButtonGroup>
            {!hideLogin && <NavLink to="/login"> Login</NavLink>}
            <GradientButton as={Link} to="/register" color="primary">
              Register
            </GradientButton>
          </AuthButtonGroup>
        )}
        {/* <UserMenu /> */}
        {hideLink && <Hamburger toggled={open} toggle={setOpen} rounded />}
      </Wrapper>
      {open && <Drawer />}
    </Header>
  );
}

export default Navbar;
