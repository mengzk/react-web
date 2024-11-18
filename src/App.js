/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: App根组件
 */

import React, { useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";

import { AppTheme } from "./components/index";
import useLaunch from "./modules/hooks/launch";

import routes from "./pages/routes";
import LaunchPage from "./pages/launch/launch";

import "./App.css";

let h5Port = null;
function App() {
  const { launch } = useLaunch();

  useEffect(() => {
    loadInit();
    return () => {};
  }, []);

  const loadInit = useCallback(() => {
    // window.removeEventListener("message", onEvent);
    // 初始化一些事情
    window.addEventListener("message", (e) => {
      console.log("message----->", e);
      if (e != null && e.data === "__hmos_port" && e.ports != null) {
        h5Port = e.ports[0]; // 1. 保存从应用侧发送过来的端口。
        if (h5Port != null) {
          h5Port.onmessage = (event) => {
            // 2. 接收ets侧发送过来的消息。
            const result = event.data;
            console.log("h5Port----->", result);
            if (window.bnq) {
              window.bnq.toast(result, 2000);
            }
          };
        }
      }
    });
  }, []);

  if (launch) {
    return (
      <AppTheme>
        {/* <div className="App"> */}
        <RouterProvider router={routes} />
        {/* <RouterProvider router={routes} fallbackElement={<FallbackPage />} /> */}
        {/* </div> */}
      </AppTheme>
    );
  } else {
    return <LaunchPage />;
  }
}

export default App;
