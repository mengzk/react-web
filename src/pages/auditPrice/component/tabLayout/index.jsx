/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 *    finish/process/wait
 */

import React, { useState, useEffect } from "react";
import { Steps, BnqPopover } from "mobilecomponet";

import "./index.less";

const storeKey = "ap-tab-show-pop"; // 是否显示弹出层
const noteList = [
  {
    status: "process",
    title: "合同收款",
    icon: "check1",
  },
  {
    status: "wait",
    title: "商品数据",
    icon: "check1",
  },
  {
    status: "wait",
    title: "下单资料",
    icon: "check1",
  },
];
//
function TabLayout3(props) {
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const show = localStorage.getItem(storeKey);
    setVisible(show != "true");
  }, []);

  useEffect(() => {
    const index = props.index || 0;
    onUpdate(index - 1);
  }, [props.index]);

  function onUpdate(index) {
    // 设置当前步骤
    const arr = [].concat(noteList);
    arr.forEach((item, i) => {
      if (i < index) {
        item.status = "finish";
      } else if (i == index) {
        item.status = "process";
      } else {
        item.status = "wait";
      }
    });
    setList(arr);
  }

  // 点击事件
  function onClick(index) {
    onUpdate(index);
    if (props.onChange) {
      props.onChange(index + 1);
    }
  }

  // 渲染弹出层 -ap-tab-show-pop
  function popView() {
    if (!visible) {
      return null;
    }
    return (
      <div className="top-pop-view">
        <BnqPopover
          mode="dark"
          placement="bottom-start"
          content="点击切换编辑信息"
          visible={visible}
          rightBtn="close"
          callBack={() => {
            setVisible(false);
            localStorage.setItem(storeKey, "true");
          }}
        />
      </div>
    );
  }

  return (
    <div className="oac3-tab-layout">
      <Steps direction="horizontal">
        {list.map((item, index) => {
          return (
            <Steps.Step
              {...item}
              key={index}
              onItemClick={() => onClick(index)}
            />
          );
        })}
      </Steps>
      {popView()}
    </div>
  );
}

export default TabLayout3;
