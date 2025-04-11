/**
 * Author: Meng
 * Date: 2025-04-02
 * Modify: 2025-04-02
 * Desc:
 */
import React, { useEffect, useState } from "react";

import "./index.css";

function InputBox(props) {
  const [focus, setFocus] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const value = props.value || "";
    setInputText(value);
  }, [props.value]);

  function onFocus(e) {
    setFocus(true);
    if(props.onFocus) {
      props.onFocus(e);
    }
  }
  function onBlur() {
    setFocus(false);
  }
  function onInput(e) {
    const value2 = e.target.value;
    setInputText(value2);
    props.onChange(value2);
  }

  let itemCls = props.className || "ib-input-box-box";
  let hintStl = "ib-input-box-label ib-input-box-lal";
  if (focus) {
    itemCls += " ib-input-box-int-focus";
    hintStl = "ib-input-box-label";
  }

  return (
    <div className={itemCls}>
      {props.hint ? (
        <span className={hintStl} hidden={!focus && !inputText}>
          {props.hint}
        </span>
      ) : null}
      <input
        className="ib-input-box-text"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        defaultValue={inputText}
        autoFocus={focus}
        type={props.type || "text"}
        inputMode={props.inputMode}
        maxLength={props.maxLength || props.max}
        placeholder={focus ? "" : props.hint}
      />
    </div>
  );
}

export default InputBox;
