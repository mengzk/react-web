/**
 * Author: Meng
 * Date: 2025-03-28
 * Modify: 2025-03-28
 * Desc:
 */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { BnqTextArea, BottomPanel, BnqToast } from "mobilecomponet";

import CellLabel from "../../../components/cell-label";
import CellInput from "../../../components/cell-input";
import Btn2 from "../../../components/btn2";

import delIc from "../../../assets/icon/del_g.png";
//
function OrderView(props, ref) {
  const [list, setList] = useState([]);

  useEffect(() => {
    // 初始化数据
    if (props.option) {
      const data = props.data;
      if (data && data.id) {
        const orderList = data.cpaLegacyItemList || [];
        orderList.forEach((item) => {
          item.key = item.id;
        });
        setList([...orderList]);
      }
    }

  }, [props.data]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      // 必填项校验
      const arr = [];
      list.forEach((item, index) => {
        if (!item.supplierLegacyCode) {
          arr.push(`遗留单${index}: 单号`);
        }else if (!item.selfJudgment) {
          arr.push(`遗留单${index}: 自评主责任`);
        }else if (!item.judgmentReason) {
          arr.push(`遗留单${index}: 判责理由`);
        }
      });
      if (arr.length > 0) {
        const text = arr[0];
        BnqToast.show({ content: text + " 不能为空" });
        return[];
      }
      return list;
    },
  }));

  // 新增遗留单
  function onAddOrder() {
    // 防抖
    const newList = [].concat(list);
    newList.push({
      key: newList.length,
      supplierLegacyCode: "",
      selfJudgment: "",
      selfJudgmentDesc: "",
      judgmentReason: "",
    });
    setList(newList);
  }

  // 删除遗留单
  function onDelete(index) {
    const newList = list.filter((_, idx) => index !== idx);
    setList(newList);
  }

  // 选择自评主责任
  function onChooseJudgment(index) {
    const data = props.option.cpaLegacySelfJudgmentEnum || [];
    BottomPanel.sheet({
      data,
      label: "label",
      touchOutCancel: true,
      onPress: (key, data) => {
        if (key == "confirm") {
          const item = data.item;
          list[index].selfJudgmentDesc = item.label;
          list[index].selfJudgment = item.index;
          setList([...list]);
        }
      },
    });
  }

  // 项目
  function itemView(item, index) {
    const num = index + 1;
    return (
      <div className="order-item" key={item.key}>
        <div className="order-top">
          <span>遗留单{num}</span>
          <img src={delIc} onClick={() => onDelete(index)} />
        </div>
        <CellInput
          label="单号"
          star
          max={20}
          value={item.supplierLegacyCode || ""}
          onFocus={props.onIntoView}
          onChange={(text) => {
            item.supplierLegacyCode = text;
            // setList([...list]);
          }}
        />
        <CellInput
          label="自评主责任"
          star
          value={item.selfJudgmentDesc || ""}
          onClick={() => onChooseJudgment(index)}
        />

        <div className="memo-box">
          <div className="cell-label">
            <span>判责理由</span>
            <span>*</span>
          </div>
          <BnqTextArea
            placeholder="请输入"
            defaultValue={item.judgmentReason || ""}
            showCount
            rows={4}
            maxCount={500}
            type="card"
            onFocus={props.onIntoView}
            onChange={(text) => {
              item.judgmentReason = text;
              setList([...list]);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="box-ar">
      <CellLabel
        title="遗留单信息"
        rightView={() => (
          <Btn2 className="order-add" onClick={onAddOrder}>
            新增
          </Btn2>
        )}
      />
      {list.map(itemView)}
    </div>
  );
}

export default forwardRef(OrderView);
