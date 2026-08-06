import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";

const root = document.querySelector<HTMLDivElement>("#root");

if (!root) {
  throw new Error("Unable to find the Snekko application root.");
}

createRoot(root).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
