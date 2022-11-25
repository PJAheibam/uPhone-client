import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { router } from "./routes/routes";
import { useToggleTheme } from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useToggleTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
