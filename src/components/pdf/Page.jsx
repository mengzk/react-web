/**
 * Author: Meng
 * Date: 2024-12-12
 * Modify: 2024-12-12
 * Desc:
 */
import React, { useState, useEffect, useRef } from "react";

function Page(props) {
  const {num, curNum, pdf} = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(Math.abs(curNum - num) < 2);
  }, [props.curNum]);

  return (
    <div id={`pdf-page-${num}`}>
      {show ? <canvas id={`pdf-canvas-${num}`}></canvas>:<></>}
      <div>加载中...</div>
    </div>
  );
}

export default Page;
