/**
 * Author: Meng
 * Date: 2025-03-14
 * Modify: 2025-03-14
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { Checkbox } from "mobilecomponet";

import "./index.less";

function CheckboxCell(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.checked) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  function onItemChoose(e) {
    setChecked(e);
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <div className="v-checkbox-cell">
      <div className="line" />
      <span className="title">{props.title}</span>
      <span className="star">{props.star ? "*" : ""}</span>
      <Checkbox checked={checked} onChange={() => onItemChoose(true)}>
        是
      </Checkbox>
      <Checkbox
        className="check-box"
        checked={!checked}
        onChange={() => onItemChoose(false)}
      >
        否
      </Checkbox>
    </div>
  );
}

export default CheckboxCell;
