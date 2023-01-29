import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToggleThemeProvider from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// styles
import "tippy.js/dist/tippy.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "react-photo-view/dist/react-photo-view.css";
import "@stripe/react-stripe-js";
// import "@stripe/react-stripe-js/common.css";
// import "rc-switch/assets/index.css";

const queryClient = new QueryClient();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </QueryClientProvider>
    </ToggleThemeProvider>
  </React.StrictMode>
);
