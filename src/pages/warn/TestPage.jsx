/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, {useState} from "react";

import TestView from "../test/test";
import TestView2 from "../test/test2";

function TestPage() {
  const [visible, setVisible] = useState(false);

  function onResult(value, e) {
    console.log("onResult", value, e);
  }

  function onFinish(e) {
    console.log("onSubmit", e);
  }

  return (
    <div className="test">
      <h1>测试代码</h1>
      {visible ? <TestView /> : <TestView2 />}
      <div>
        <button onClick={() => setVisible(!visible)}>切换</button>
      </div>
    </div>
  );
}

export default TestPage;
