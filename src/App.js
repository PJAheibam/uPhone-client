import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { router } from "./routes/routes";
import { useToggleTheme } from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const { theme } = useToggleTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <SkeletonTheme
          baseColor="hsl(var(--primary-hue) 10% 20%)"
          highlightColor="hsl(var(--primary-hue) 10% 50%)"
        >
          <RouterProvider router={router} />
        </SkeletonTheme>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
