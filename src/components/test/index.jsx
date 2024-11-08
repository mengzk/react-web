/**
 * Author: Meng
 * Date: 2023-10-12
 * Modify: 2023-10-12
 * Desc:
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./index.css";

function InputBox(props, ref) {
  const [focus, setFocus] = useState(props.autoFocus);
  const [inputText, setInputText] = useState("");
  const [verify, setVerify] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const value = props.value || "";
    setInputText(value);
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [props.value]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue() {
          return inputText || "";
        },
        setValue(value = "") {
          setInputText(value);
          if (inputRef.current) {
            inputRef.current.value = value;
          }
          // setFocus(true);
        },
        setVerify(msg = "") {
          setVerify(msg);
        },
        focus: () => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        },
        blur: () => {
          if (inputRef.current) {
            inputRef.current.blur();
          }
        },
      };
    },
    []
  );

  function onFocus() {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus();
    }
  }
  function onBlur() {
    setFocus(false);
    if (props.onVerify) {
      const msg = props.onVerify(inputText);
      setVerify(msg);
    }
    if (props.onBlur) {
      props.onBlur();
    }
  }
  function onInput(e) {
    const value = props.value;
    const value2 = e.target.value;
    if(value !== undefined && value !== null) {
      setInputText(value);
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }
    props.onChange(value2);
  }

  if (props.tag === "box" || props.tag === undefined) {
    let itemCls = props.class || "v3-input-box-item-box";
    let hintStl = "v3-input-box-item-label v-int-im-lal";
    if (focus) {
      itemCls += " v3-input-box-item-int-focus";
      hintStl = "v3-input-box-item-label";
    }
    let itemStyle = {};
    if (props.width) {
      itemStyle.width = props.width;
    }
    if (props.flex) {
      itemStyle.flex = props.flex;
    }

    return (
      <div className={itemCls} style={itemStyle}>
        {props.placeholder ? (
          <span
            className={hintStl}
            hidden={!focus && !inputText}
            style={props.labelStyle}
          >
            {props.placeholder}
          </span>
        ) : (
          <></>
        )}
        <input
          ref={inputRef}
          className="v3-input-box-item-text"
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onInput}
          type={props.type}
          defaultValue={inputText}
          autoFocus={focus}
          inputMode={props.inputMode}
          maxLength={props.maxLength}
          placeholder={focus ? "" : props.placeholder}
        />
      </div>
    );
  } else {
    let inpCls = "v3-input-box-in-box";
    if (focus) {
      inpCls += " v-it-gp-focus";
    }
    if (verify) {
      inpCls += " v3-input-box-err";
    }
    return (
      <div className="v3-input-box-item">
        <h3 className="v3-input-box-label" style={props.labelStyle}>
          {props.label}
        </h3>
        <div className={inpCls}>
          <input
            ref={inputRef}
            className="v3-input-box-input"
            placeholder={props.placeholder}
            autoFocus={focus}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onInput}
            defaultValue={inputText}
            // {...props}
          />
          {props.rightView ? props.rightView() : <></>}
        </div>
        {verify ? (
          <span className="v3-input-box-err-text">{verify}</span>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default forwardRef(InputBox);
