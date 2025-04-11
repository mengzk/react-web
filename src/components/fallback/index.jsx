/**
 * Author: Meng
 * Date: 2025-03-04
 * Modify: 2025-03-04
 * Desc: 
 */
import React, { useEffect } from "react";
import BnqLottie from "../loading";

import "./index.css";
// 页面渲染，占位页面
function Fallback(props) {
  useEffect(() => {
    BnqLottie.onShow('页面加载中...');
    return () => {
      BnqLottie.onHide();
    };
  }, []);
  return <div className="v-fallback-page">页面加载中...</div>;
}

export default Fallback;