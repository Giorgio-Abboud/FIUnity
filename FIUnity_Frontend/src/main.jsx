import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./Navigation.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Homepage from './Homepage.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Navigation />
    </BrowserRouter>
  </React.StrictMode>
);
  
    <Homepage />
  </React.StrictMode>,
)
