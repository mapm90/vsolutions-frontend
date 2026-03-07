import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // <-- Importamos HelmetProvider
import App from "./App.tsx";
import "./index.css";
// Antes del ReactDOM.createRoot(...)
const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (stored === "dark" || (!stored && prefersDark)) {
  document.documentElement.classList.add("dark");
}
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
