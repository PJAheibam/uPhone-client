import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToggleThemeProvider from "./context/ThemeContext";

// styles
import "swiper/css";
import "swiper/css/pagination";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <App />
    </ToggleThemeProvider>
  </React.StrictMode>
);
