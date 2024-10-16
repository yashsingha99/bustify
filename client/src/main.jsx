import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScrollProvider } from "./context/ScrollContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollProvider>
        <App />
    </ScrollProvider>
  </StrictMode>
);