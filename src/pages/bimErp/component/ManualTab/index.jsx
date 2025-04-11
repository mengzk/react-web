/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: scrollTop
 */
import React, { useState } from "react";

import "./index.css";

function ManualTab(props) {
  const [current, setCurrent] = useState(0);

  function onBack() {
    if (props.onBack) {
      props.onBack();
    } else {
      window.history.back();
    }
  }

  function onChangeTab(num) {
    setCurrent(num);
  }
  

  return (
    <div className="v-manual-tab">
    </div>
  );
}

export default ManualTab;
