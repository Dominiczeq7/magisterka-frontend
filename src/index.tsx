import React from "react";
import ReactDOM from "react-dom";
import "./styles/antd-my-theme.css";
import "./styles/index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
