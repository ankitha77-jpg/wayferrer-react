import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider> {/* Provides global support for dynamic SEO metadata via react-helmet-async */}
    <App />
  </HelmetProvider>
);