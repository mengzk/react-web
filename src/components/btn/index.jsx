/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc: 防抖按钮
 *   参数：
 *      className：按钮样式
 *      style：按钮样式
 *      onClick：点击事件
 */
import React, { useRef } from "react";

//
function Btn(props) {
  const timer = useRef(0);

  function onClick() {
    // 防抖
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      timer.current = 0;
    }, 500);
    // 点击事件
    if (props.onClick && timer.current === 0) {
      props.onClick();
    }
  }

  return (
    <div className={props.className} style={props.style} onClick={onClick}>
      {props.children}
    </div>
  );
}

export default Btn;
