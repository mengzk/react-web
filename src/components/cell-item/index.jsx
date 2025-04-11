/**
 * Author: Meng
 * Date: 2025-03-14
 * Modify: 2025-03-14
 * Desc:
 */

import React from "react";

import nextIc from "../../assets/icon/back_b.png";
import "./index.less";

function CellItem(props) {
  
  function rightView() {
    if (props.onClick) {
      return (
        <div className="right" onClick={props.onClick}>
          <span className={props.value ? "" : "hint"}>
            {props.value || props.hint || "请选择"}
          </span>
          <img className="icon" src={nextIc} />
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className="v-cell2-item">
      <div className="line" />
      <span className="title">{props.title}</span>
      <span className="star">{props.star ? "*" : ""}</span>
      {props.desc ? <span className="desc">{props.desc}</span> : <></>}
      {rightView()}
    </div>
  );
}

export default CellItem;
