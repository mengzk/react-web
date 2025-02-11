/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: App根组件
 */

import React, { useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";

import useLaunch from "./modules/hooks/launch";
import Account from "./modules/store/account";

import routes from "./pages/routes";
import LaunchPage from "./pages/launch/launch";

import "./App.css";

function App() {
  const { launch } = useLaunch();

  useEffect(() => {
    Account.getInfo();
    loadInit();
    return () => {};
  }, []);

  const loadInit = useCallback(() => {
    // 初始化一些事情
  }, []);

  if (launch) {
    return <RouterProvider router={routes} />;
  } else {
    return <LaunchPage />;
  }
}

export default App;
