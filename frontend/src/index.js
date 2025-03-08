import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // Use "react-dom/client" for createRoot
import App from "./App"; // Importing our main App component

// Selecting the root element in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App inside StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
