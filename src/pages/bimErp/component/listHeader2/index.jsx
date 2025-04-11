/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: scrollTop
 */
import React, { useState, useEffect } from "react";

import { onH5Close } from '../../../../libs/bnq';
import "./index.css";
import backIc from "../../../../assets/icon/back_b.png";

function ListHeader(props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(props.current);
  }, [props.current]);

  function onBack() {
    if (props.onBack) {
      props.onBack();
    } else {
      onH5Close();
    }
  }

  function onChangeTab(num) {
    setCurrent(num);
    if (props.onChange) {
      props.onChange(num);
    }
  }
  

  return (
    <div className="v-tab3-box">
      <div className="v-tab3-action" onClick={onBack}>
        <img className="v-tab3-back" src={backIc}/>
      </div>

      <div
        className={`v-tab3-title ${current == 0 ? "active" : ""}`}
        onClick={() => onChangeTab(0)}
      >
        谈单手册
      </div>
      <div
        className={`v-tab3-title ${current == 1 ? "active" : ""}`}
        onClick={() => onChangeTab(1)}
      >
        商品清单
      </div>

      <div className="v-tab3-action"></div>
    </div>
  );
}

export default ListHeader;
