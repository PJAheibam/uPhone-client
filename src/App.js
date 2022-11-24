import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { router } from "./routes/routes";
import { useToggleTheme } from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";

function App() {
  const { theme } = useToggleTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
