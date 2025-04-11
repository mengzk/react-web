/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 *  {
      "groupCode": "goods_group_2",
      "groupName": "衣柜",
      "sort": 2,
      "checked": true,
      "itemList": [
        {
          "itemName": "总平方数",
          "unitName": "平米",
          "unitCode": "unit_2",
          "sort": 1,
          "itemValue": 5,
          "itemCode": "goods_item_5"
        }
      ]
    }
 */

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { BnqToast } from "mobilecomponet";

import CellLabel from "../../../../components/cell-label";
import InputBox from "../../../../components/inputBox";
import Btn2 from "../../../../components/btn2";

import check from "../../../../assets/icon/checkbox.png";
import check2 from "../../../../assets/icon/checkbox2.png";
import addIc from "../../../../assets/icon/add2_bule.png";
import delIc from "../../../../assets/icon/del_blue.png";

import "./index.less";

function TabForm2(props, ref) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const option = props.option || {};
    // const data = props.data || {};
    if (option) {
      const goodsGroup = option.goodsInfoGroupList || [];
      setList(goodsGroup);
    }
  }, [props.data, props.option]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      // 必填校验
      const arr = [];
      const list2 = list.filter((e) => e.checked);
      let alert = "";
      list2.forEach((item) => {
        if (item.checked) {
          const it3 = item.itemList || [];
          it3.forEach((e) => {
            if (!e.itemValue) {
              arr.push(`${item.groupName}: ${e.itemName}`);
            }
          });
        }
      });
      if (arr.length > 0) {
        alert = arr[0] + " 不能为空";
        // BnqToast.show({ content: alert });
        // return [];
      }
      return { list: list2, alert };
    },
  }));

  // 选择商品
  function onSelect(item) {
    item.checked = !item.checked;
    setList([...list]);
  }

  // 新增工厂订单号
  function onAddOrder(item) {
    const orders = item.supplierOrderNoList || [];
    orders.push("");
    item.supplierOrderNoList = [].concat(orders);
    setList([].concat(list));
  }

  // 删除工厂订单号
  function onDelOrder(item, idx) {
    let orders = item.supplierOrderNoList || [];
    orders = orders.filter((_, i) => i != idx);
    item.supplierOrderNoList = orders;
    setList([].concat(list));
  }

  // 编辑
  function editView(item, index) {
    const icon = item.checked ? check : check2;
    const orders = item.supplierOrderNoList || [];
    const items = item.itemList || [];
    const clsName = items.length > 1 ? "input-grid" : "input-group";

    return (
      <div className="goods" key={index}>
        <div className="label-box" onClick={() => onSelect(item)}>
          <img className="item-icon" src={icon} />
          <span className="label">{item.groupName}</span>
        </div>

        {item.checked ? (
          <>
            <div className={clsName}>
              {items.map((e, idx) => {
                const label = `${e.itemName}(${e.unitName})`;
                return (
                  <InputBox
                    key={idx}
                    max={10}
                    value={e.itemValue}
                    hint={label}
                    inputMode="decimal"
                    type="number"
                    onFocus={props.onIntoView}
                    onChange={(text) => {
                      list[index].itemList[idx].itemValue = text;
                      setList([].concat(list));
                    }}
                  />
                );
              })}
            </div>
            <div className="orders">
              <div className="order-top">
                <span>工厂订单号</span>
                <Btn2 className="item-add" onClick={() => onAddOrder(item)}>
                  <img src={addIc} />
                  <span>新增</span>
                </Btn2>
              </div>
              {orders.map((e, idx) => {
                const key = `${orders.length}${idx}`;
                return (
                  <div className="order-item" key={key}>
                    <input
                      placeholder="请输入"
                      maxLength={20}
                      defaultValue={e}
                      onFocus={props.onIntoView}
                      onChange={(e) => {
                        orders[idx] = e.target.value;
                        list[index].supplierOrderNoList = orders;
                        setList([].concat(list));
                      }}
                    />
                    <img src={delIc} onClick={() => onDelOrder(item, idx)} />
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  if (!props.visible) {
    return <></>;
  }
  return (
    <div className="oac-tab-form2">
      <div className="box-c flex">
        <CellLabel title="商品数据" desc="若无商品数据不勾选" />
        {list.map(editView)}
      </div>
    </div>
  );
}

export default forwardRef(TabForm2);
