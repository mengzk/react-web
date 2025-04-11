/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { Gallery } from "mobilecomponet";

import CellLabel from "../../../../components/cell-label";

import "./index.less";

function ApplyOrderView(props, ref) {
  const info = props.info || {};
  const [goods, setGoods] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.info) {
      const fileGroup = info.fileInfoGroupList || [];
      const goodsList = info.goodsInfoGroupList || [];
      const selectGoods = goodsList.filter((item) => item.checked);
      setList(fileGroup);
      setGoods(selectGoods);
    }
  }, [props.info]);

  // 商品信息
  function goodsView(item, index) {

    const list = (item.itemList || []).filter(e => e.itemValue).map(
      (e) => `${e.itemName}：${e.itemValue}${e.unitName}`
    );
    const orders = item.supplierOrderNoList || [];
    const orderCode = orders.join("/");

    return (
      <div className="goods-item" key={index}>
        <span className="label">{item.groupName}:</span>
        <div className="value-g">
        <div className="grid">
          {list.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
        {orderCode ? (
          <div className="order-code">工厂订单号：{orderCode}</div>
        ) : null}
        </div>
      </div>
    );
  }

  // 上传文件
  function uploadView(item, index) {
    const files = item.itemList || [];
    if (files.length == 0) return <></>;
    return (
      <div className="upload-item" key={index}>
        <span className="label">{item.groupName}</span>
        <Gallery files={files} column={4} gap={8} />
      </div>
    );
  }

  return (
    <div className="cap-ao-view">
      <div className="box-a">
        <CellLabel title="下单资料" />
        <div className="goods-info">{goods.map(goodsView)}</div>
        {list.map(uploadView)}
      </div>
    </div>
  );
}

export default ApplyOrderView;
