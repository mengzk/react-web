/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */
import React, { useEffect, useState } from "react";

import Header from "../../components/header";

import "./index.css";

export function NotFound() {
  const [domain, setDomain] = useState("");
  useEffect(() => {
    document.title = "404";
    const path = window.location.href;
    // if(path.indexOf('#') > -1){
    //   setDomain(path.split('#')[1]);
    // }else {
    setDomain(path);
    // }
  }, []);
  return (
    <div className="notfound">
      <Header title="加载失败" />
      <div className="box-layout">
        <h3>页面不存在，请检查路径是否正确！</h3>
        <div className="path-hint">路径：{domain}</div>
      </div>
    </div>
  );
}
export default NotFound;
