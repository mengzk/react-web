/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc: 节流按钮
 *   参数：
 *      className：按钮样式
 *      style：按钮样式
 *      onClick：点击事件
 */
import React, { useRef } from "react";

//
function Btn2(props) {
  const timer = useRef(0);

  function onClick(e) {
    // 节流
    const now = Date.now();
    if (now - timer.current < 500) {
      return;
    }
    timer.current = now;
    // 点击事件
    if (props.onClick) {
      props.onClick(e);
    }
  }

  return (
    <div className={props.className} style={props.style} onClick={onClick}>
      {props.children}
    </div>
  );
}

export default Btn2;
