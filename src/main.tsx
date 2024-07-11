import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import "./styles/tailwind.css";
import "./styles/app.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App>
      <Routes />
    </App>
  </React.StrictMode>
);
