/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc:
 */

import React from "react";

import nextIc from "../../assets/icon/back_b.png";
import "./index.less";

function CellInput(props) {
  const shaw = props.star;
  const click = props.onClick != null;
  const hint = props.hint || (click ? "请选择" : "请输入");

  function onClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  function onChange(text) {
    props.onChange && props.onChange(text);
  }

  function rightView() {
    if (props.rightView) {
      return props.rightView();
    } else if (click) {
      return <img className="icon" src={nextIc} />;
    } else {
      return <></>;
    }
  }

  return (
    <div className="ci-cell-input">
      <span className="label">{props.label}</span>
      <span className="star">{shaw ? "*" : ""}</span>
      <div className="value" key={props.value} onClick={onClick}>
        <input
          className="input"
          readOnly={click}
          defaultValue={props.value}
          type={props.type || "text"}
          onFocus={props.onFocus}
          maxLength={props.max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={hint}
        />
        {rightView()}
      </div>
    </div>
  );
}

export default CellInput;
