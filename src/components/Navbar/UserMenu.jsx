import { useState } from "react";
import styled from "styled-components";
import { useTransition } from "react-spring";
import { MenuContainer, MenuItem, MenuText, MenuBtnContainer } from "../menu";
import userIcon from "../../assets/icons/user.png";
import {
  MdOutlineDashboard as DashboardIcon,
  MdOutlineLogout as LogoutIcon,
} from "react-icons/md";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const transitionApi = useTransition(open, {
    from: { opacity: 0, scale: 0.9 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.79 },
  });

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <MenuBtnContainer>
      <Button onClick={toggleMenu}>
        <Avatar src={userIcon} alt="User Avatar" />
      </Button>
      {transitionApi(
        (styles, item) =>
          item && (
            <MenuContainer style={styles}>
              <MenuItem>
                <DashboardIcon />
                <MenuText>Dashboard</MenuText>
              </MenuItem>
              <MenuItem>
                <LogoutIcon />
                <MenuText>Logout</MenuText>
              </MenuItem>
            </MenuContainer>
          )
      )}
    </MenuBtnContainer>
  );
}

export default UserMenu;

const Button = styled.button`
  display: flex;
  aspect-ratio: 1;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.25);
  transition: scale 100ms ease;
  &:active {
    scale: 0.975;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
