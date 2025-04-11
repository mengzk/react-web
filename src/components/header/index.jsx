/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc:
 */
import React from "react";

import backIcon from "../../assets/icon/back_b.png";

import "./index.css";

function Header(props) {
  function onMenu() {}

  function onBack() {
    if (props.onBack) {
      props.onBack();
    } else {
      window.history.back();
    }
  }

  return (
    <div className="v-header101-box">
      <div className="v-header101-btn" onClick={onBack}>
        <img className="v-header101-back" src={backIcon} />
      </div>
      <span className="v-header101-title">{props.title || "App"}</span>
      <div className="v-header101-btn v-header101-btn2" onClick={onMenu}>
        {props.rightView ? props.rightView() : null}
      </div>
    </div>
  );
}

export default Header;
