import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "./index.css"
import { UserProvider } from "./context/userProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </UserProvider>
  </StrictMode>
);
