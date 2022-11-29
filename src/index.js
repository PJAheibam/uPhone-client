import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToggleThemeProvider from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// styles
import "tippy.js/dist/tippy.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "react-photo-view/dist/react-photo-view.css";
// import "rc-switch/assets/index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ToggleThemeProvider>
  </React.StrictMode>
);
