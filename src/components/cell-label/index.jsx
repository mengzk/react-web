/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc: 
 */

import React from "react";

import "./index.less";

function CellLabel(props) {
  const shaw = props.star;
  return (
    <div className="v-cell-label" style={props.style||{}}>
      <div className="line" />
      <span className="title">{props.title}</span>
      {props.desc ? <span className="desc">{props.desc}</span> : <></>}
      <span className="star">{shaw ? "*" : ""}</span>
      {props.rightView ? props.rightView() : <></>}
    </div>
  );
}

export default CellLabel;
