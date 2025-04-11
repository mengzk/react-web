/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 入口文件
 */
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/app";

import reportWebVitals from "./reportWebVitals";

import { initConfig } from "./utils/boot";
import { errHandler } from "./utils/error";

import "./index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();

initConfig();
errHandler();

console.log("---> process", process.env);