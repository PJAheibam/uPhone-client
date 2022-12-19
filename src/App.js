import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { router } from "./routes/routes";
import { useToggleTheme } from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import UserRoleProvider from "./context/UserRoleContext";

function App() {
  const { theme } = useToggleTheme();
  const baseColor =
    theme.palette.mode === "dark"
      ? "hsl(var(--primary-hue) 10% 18%)"
      : "hsl(var(--primary-hue) 20% 88%)";
  const heighlightColor =
    theme.palette.mode === "dark"
      ? "hsl(var(--primary-hue) 10% 27%)"
      : "hsl(var(--primary-hue) 20% 94%)";
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <SkeletonTheme baseColor={baseColor} highlightColor={heighlightColor}>
          <RouterProvider router={router} />
        </SkeletonTheme>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
