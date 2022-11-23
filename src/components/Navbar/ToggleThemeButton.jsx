import React from "react";
import styled from "styled-components";
import {
  MdOutlineDarkMode as DarkIcon,
  MdOutlineLightMode as LightIcon,
} from "react-icons/md";
import { useToggleTheme } from "../../context/ThemeContext";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <Button onClick={toggleTheme} aria-label="Thoggle theme">
      {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
}

export default ToggleThemeButton;

const Button = styled.button`
  will-change: color;
  color: hsl(var(--text-primary));
  font-size: 1.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  transition: color 200ms ease;
  &:hover {
    color: hsl(var(--primary-main));
  }
`;
