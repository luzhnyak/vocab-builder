import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./modern-normalize.css";
import "./fonts.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="vocab-builder">
    <App />
  </BrowserRouter>
);
