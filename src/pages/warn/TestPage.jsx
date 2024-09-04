/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, {useState} from "react";

import MobxDemo from "../test/mobx/MobxDemo";
import TestRedux from "../test/redux/index";

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
      {/* <MobxDemo /> */}
      <TestRedux />
    </div>
  );
}

export default TestPage;
