import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScrollProvider } from "./context/ScrollContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
// import { ClerkProvider } from "@clerk/clerk-react";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

// const onRedirectCallback = (appState) => {
//   navigate(appState?.returnTo || window.location.pathname);
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollProvider>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
        <App />
      {/* </ClerkProvider> */}
    </ScrollProvider>
  </StrictMode>
);