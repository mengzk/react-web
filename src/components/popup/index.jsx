/*
 * Author: Meng
 * Create: YEAR-MONTH-DAY
 * Modify: YEAR-MONTH-DAY
 * Desc:
 */

import React, { useState, useEffect } from "react";

import "./index.css";

function Popup(props) {

  useEffect(() => {
    const popup = document.getElementById("popup");
    const view = document.getElementById("v-popup");
    if(view) {
      popup.style.display = "flex";
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.appendChild(view);
    }
    return () => {
      if(view) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          view.style.animation = "popupOut 1s";
          popup.appendChild(view);
          popup.style.display = "none";
        }, 1000);
      }
    }
  }, []);

  return (
    <div className="v-popup3" id="v-popup">
      <span>确定要删除吗？</span>
    </div>
  );
}

export default Popup;
