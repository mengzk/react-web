/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc: 
 */
import React from "react";
import { Outlet } from "react-router";

import "./index.css";

function Layout(props) {
  return (
    <div className="v-layout">
      <Outlet />
    </div>
  );
}

export default Layout;
