/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: scrollTop
 */
import React from "react";

import "./index.less";
import downW from "../../../../assets/icon/down_w.png";
import shareW from "../../../../assets/icon/share_blue.png";
import hbIc from "../../../../assets/icon/hb212.png";
import qdIc from "../../../../assets/icon/qd213.png";

// 列表项
function ListItem(props) {
  const item = props.item || {};

  function onClick(e, tag) {
    e.stopPropagation(); // 阻止事件冒泡
    if (props.onAction) {
      props.onAction(tag, item);
    }
  }

  function itemActions() {
    if (props.tag == 1) {
      return (
        <div className="v-item-action">
          <div
            className="v-item-action-btn btn2"
            onClick={(e) => onClick(e, "share")}
          >
            <img src={shareW} alt="" />
            <span>分享</span>
          </div>
          <div
            className="v-item-action-btn"
            onClick={(e) => onClick(e, "down")}
          >
            <img src={downW} alt="" />
            <span>下载</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="v-item-action">
          <div className="v-item-action-btn">
            <span>查看</span>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="v-list-item101" onClick={(e) => onClick(e, "detail")}>
      <div className="v-item-title-box">
        <div className="v-item-title-line"></div>
        <span className="v-item-title">
          {item.shopName}-{item.name}
        </span>
      </div>
      <span className="v-item-date">{item.date}</span>
      {itemActions()}
      <img className="v-item-tag" src={props.tag == 0 ? hbIc : qdIc} />
    </div>
  );
}

export default ListItem;
