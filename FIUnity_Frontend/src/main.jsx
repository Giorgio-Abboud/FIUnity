import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./Navigation.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navigation />
    </BrowserRouter>
  </React.StrictMode>
);
