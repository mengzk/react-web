/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useState, useEffect } from "react";

import "./index.css";

function UserItem(props) {
  const item = props.data || {};

  useEffect(() => {}, []);

  return (
    <div className="v-user-item">
      <div className="v-user-item-top">
        <span>
          <span>姓名: </span>
          <span className="v-user-item-name">{item.name}</span>
        </span>
        <span>
          <span>年龄: </span>
          <span className="v-user-item-age">{item.age}</span>
        </span>
        <span>
          <span>性别: </span>
          <span className="v-user-item-sex">{item.sex}</span>
        </span>
      </div>
      <div className="v-user-item-info">
        <div className="v-user-info-box">
          <span>血糖</span>
          <span className="v-user-info-text">120</span>
        </div>
        <span className="v-user-info-box">
          <span>血脂</span>
          <span className="v-user-info-text">130</span>
        </span>
        <span className="v-user-info-box">
          <span>心率</span>
          <span className="v-user-info-text">78</span>
        </span>
      </div>
    </div>
  );
}

export default UserItem;
