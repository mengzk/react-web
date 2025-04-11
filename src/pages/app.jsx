/**
 * Author: Meng
 * Date: 2025-02-25
 * Modify: 2025-02-25
 * Desc: 根组件
 */
import React, { useEffect } from "react";
import { RouterProvider } from "react-router";

import Fallback from "../components/fallback";
import useLaunch from "../hooks/launch";
import routes from "../router/index";

// 
function App() {
  const { inited } = useLaunch(); // 初始化

  useEffect(() => {
    if(inited){
      loadInit();
    }
    return () => {};
  }, [inited]);

  const loadInit = () => {
    // 登录态配置项初始化
    console.log('---> init', inited);
  };

  if (!inited) {
    return <Fallback />;
  }else {
    return <RouterProvider router={routes} />;
  }
}

export default App;
