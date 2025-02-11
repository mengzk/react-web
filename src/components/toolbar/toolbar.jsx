/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: scrollTop
 */
import React, { useState } from "react";

import logoIcon from "../../assets/icon/logo.png";

import "./toolbar.css";

function Toolbar(props) {

  function onHome() {
    console.log("window.history:", window.history);
    // window.history.back();
  }

  function onClickTab(e) {
    // console.log("e:", e);
    const id = e.target.id;
    if (props.onChange) {
      props.onChange(id);
    }
  }

  return (
    <>
      <div className="v-tb-box">
        <div className="v-tb-btn" onClick={onHome}>
          <img className="v-tb-logo" src={logoIcon} />
          <span className="v-tb-name">Logo</span>
        </div>
        <div className="v-tb-tab" onClick={onClickTab}>
          <span className="v-tb-tab-name">
            名称
          </span>
          <img className="v-tb-tab-icon" src={logoIcon} />
        </div>
      </div>
      <div className="v-tb-height" />
    </>
  );
}

export default React.memo(Toolbar);
