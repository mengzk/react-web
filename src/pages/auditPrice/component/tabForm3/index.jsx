/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 * {
      label: "衣柜",
      index: "yg",
      checked: false,
      list: [
        {
          name: "总平方数(米)",
          index: "num",
          value: "12",
        },
      ],
    }
 */

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { BnqToast } from "mobilecomponet";

import AttachUpload from "../../../../components/attachUpload";
import CellLabel from "../../../../components/cell-label";

import "./index.less";

function TabForm3(props, ref) {
  const [goods, setGoods] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const option = props.option || {};
    // const data = props.data || {};
    if (option) {
      const fileGroup = option.fileInfoGroupList || [];
      setList(fileGroup);
    }
  }, [props.data, props.option]);

  // 商品信息
  useEffect(() => {
    const goodsList = props.goods || [];
    setGoods(goodsList);
  }, [props.goods]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      // 必填项校验
      const arr = [];
      let alert = "";
      list.forEach((item) => {
        if (!item.itemList || item.itemList.length == 0) {
          arr.push(item.groupName);
        }
      });
      if (arr.length > 0) {
        alert = arr[0] + " 不能为空";
        // BnqToast.show({ content: alert });
        // return [];
      }
      list.forEach((e) => {
        e.itemList = e.itemList.map((f) => ({ name: f.name, url: f.url }));
      });
      const list2 = list.filter((e) => e.itemList?.length > 0);
      return { list: list2, alert };
    },
  }));

  // 商品信息
  function goodsView(item, index) {
    const list = (item.itemList || []).map(
      (e) => `${e.itemName}：${e.itemValue||''}${e.unitName}`
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
    return (
      <div className="upload-item" key={index}>
        <span className="label">{item.groupName}</span>
        <AttachUpload
          tag={index}
          files={files}
          max={10}
          onUpdate={(res) => {
            // console.log("onChange", res);
            const newList = [...list];
            newList[index].itemList = res;
            setList(newList);
          }}
        />
      </div>
    );
  }

  // 组件
  if (!props.visible) {
    return <></>;
  } else {
    return (
      <div className="oac-tab-form3">
        <div className="box-c">
          <CellLabel title="下单资料" />
          <div className="goods-info">
            {goods.map(goodsView)}
            {goods.length < 1 ? <span>您未选择商品</span> : null}
          </div>
          {list.map(uploadView)}
        </div>
      </div>
    );
  }
}

export default forwardRef(TabForm3);
