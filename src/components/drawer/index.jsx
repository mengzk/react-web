/*
 * Author: Meng
 * Create: YEAR-MONTH-DAY
 * Modify: YEAR-MONTH-DAY
 * Desc:drawer
 */

import React, { useState, useEffect } from "react";

import "./index.css";

function Popup(props) {

  useEffect(() => {
    const popup = document.getElementById("popup");
    const view = document.getElementById("v-drawer");
    if(view) {
      popup.style.display = "flex";
      popup.style.justifyContent = 'flex-end';
      popup.appendChild(view);
    }
    return () => {
      if(view) {
        popup.appendChild(view);
      }
      popup.style.display = "none";
    }
  }, []);

  return (
    <div className="v-drawer3" id="v-drawer">
      <span>确定要删除吗？</span>
    </div>
  );
}

export default Popup;
