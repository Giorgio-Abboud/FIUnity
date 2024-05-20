import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/NavBar/Navigation";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </React.StrictMode>
);
