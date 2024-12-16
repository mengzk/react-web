/**
 * Author: Meng
 * Date: 2023-11-16
 * Modify: 2023-11-16
 * Desc:
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import VConsole from "vconsole";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { systemInit } from "./modules/system/index";
import store from "./stores/app";

/**
 * 原生执行函数
 * webView.evaluateJavascript("javascript:setAppAgent('$user')", ValueCallback<String> { value ->Log.i(TAG, "evaluateJavascript: $value") })
 */
function setAppAgent(res) {
  localStorage.setItem("appAgent3", JSON.stringify(res));
}
window.setAppAgent = setAppAgent;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

systemInit();
// console.log('package:', info)
// console.log('process:', process.env)
new VConsole();
