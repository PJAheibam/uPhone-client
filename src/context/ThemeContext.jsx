import { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext();

function ToggleThemeProvider({ children }) {
  const [theme, setTheme] = useState(darkTheme);

  function toggleTheme() {
    setTheme((previousTheme) =>
      previousTheme.palette.mode === "dark" ? lightTheme : darkTheme
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useToggleTheme = () => useContext(ThemeContext);

export default ToggleThemeProvider;
