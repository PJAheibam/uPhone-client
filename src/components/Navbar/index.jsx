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
import { useBreakpoints } from "react-use-size";
import Drawer from "./Drawer";
import DashDrawer from "./DashDrawer";
import Tippy from "@tippyjs/react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDashMenu, setOpenDashMenu] = useState(false);
  const { user } = useAuth();
  const [hideThemeToggler, hideLogin, hideLink, showDashButton] =
    useBreakpoints([410, 529, 725, 900]);

  // auto close navmenu on large display
  useEffect(() => {
    if (!hideLink) {
      setOpen(false);
    }
    if (!showDashButton) {
      setOpenDashMenu(false);
    }
  }, [hideLink, showDashButton]);
  return (
    <Header>
      <Wrapper>
        {showDashButton && (
          <Tippy content="Dashboard Menu">
            <Hamburger
              toggled={openDashMenu}
              toggle={setOpenDashMenu}
              rounded
            />
          </Tippy>
        )}
        <Logo style={{ marginRight: "auto" }} />
        {!hideLink && <NavLinks />}
        {!hideThemeToggler && <ToggleThemeButton />}
        {!user.uid && (
          <AuthButtonGroup>
            {!hideLogin && <NavLink to="/login"> Login</NavLink>}
            <GradientButton as={Link} to="/register" color="primary">
              Register
            </GradientButton>
          </AuthButtonGroup>
        )}
        {/* <UserMenu /> */}
        {hideLink && (
          <Tippy content="Nav Menu">
            <Hamburger
              label="Nav Menu"
              toggled={open}
              toggle={setOpen}
              rounded
            />
          </Tippy>
        )}
      </Wrapper>
      <Drawer open={open} />
      <DashDrawer open={openDashMenu} />
    </Header>
  );
}

export default Navbar;
