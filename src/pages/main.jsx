/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React from "react";
import { Outlet } from "react-router-dom";

function MainPage(props) {
  return <div className="page">
    <Outlet />
  </div>;
}

export default MainPage;
