/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { BnqTextArea, BnqToast } from "mobilecomponet";

import CellLabel from "../../../../components/cell-label";
import Money from "../../../../components/money";
import Btn2 from "../../../../components/btn2";

import checkIc from "../../../../assets/icon/checked.png";
import checkIc2 from "../../../../assets/icon/checked2.png";
import "./index.less";

function TabForm1(props, ref) {
  const [list, setList] = useState([]);
  const [ctAmount, setCtAmount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const remarkRef = useRef("");

  useEffect(() => {
    const option = props.option || {};
    // const data = props.data || {};
    if (option) {
      const { collectionInfo, contractInfoList } = option;
      // 处理合同列表
      const contracts = contractInfoList || [];
      let total = 0;
      let refund = 0;
      contracts.forEach((item) => {
        if (item.checked) {
          total += item.contractAmount || 0;
          refund += item.refundAmount || 0;
        }
      });
      remarkRef.current = collectionInfo?.reason || "";
      setCtAmount(total);
      setRefundAmount(refund);
      setPayAmount(collectionInfo?.paidAmount || 0);
      setList(contracts);
    }
  }, [props.data, props.option]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      // 过滤选中的合同
      const contracts = list.filter((e) => e.checked);
      const remark = remarkRef.current;
      let alert = "";
      // 必填项校验
      if (contracts.length < 1) {
        alert = "至少选择一个合同";
        // BnqToast.show({ content: "至少选择一个合同" });
      } else if (ctAmount > payAmount && !remark) {
        alert = "已收金额小于应收金额请填写备注";
        // BnqToast.show({ content: "已收金额小于应收金额请填写备注" });
      }
      return { contracts, remark, alert };
    },
  }));

  // 编辑备注
  function onChangeText(value) {
    remarkRef.current = value;
  }

  // 选择合同
  function onSelect(item) {
    item.checked = !item.checked;
    // 合同金额
    let total = 0;
    list.forEach((e) => {
      if (e.checked) {
        total += e.contractAmount;
      }
    });
    setCtAmount(total);
    setList([...list]);
  }

  // 合同列表
  function itemView(item, index) {
    const icon = item.checked ? checkIc : checkIc2;
    return (
      <div className="contract" key={index} onClick={() => onSelect(item)}>
        <div className="info-box">
          <span className="title">
            合同金额： <Money digit="2" text={item.contractAmount} />
          </span>
          <div className="desc">
            <span>合同号：</span>
            <span>{item.contractNo}</span>
          </div>
          <div className="desc">
            <span>签约时间：</span>
            <span>{item.finishTime || "-"}</span>
          </div>
        </div>
        <img className="item-icon" src={icon} />
      </div>
    );
  }

  // 组件加载完成
  if (!props.visible) {
    return <></>;
  }
  return (
    <div className="oac-tab-form1">
      <div className="box-c">
        <CellLabel title="合同" desc="至少选择一个合同" />
        {list.map(itemView)}
      </div>
      <div className="box-c">
        <CellLabel
          title="收款"
          rightView={() => (
            <Btn2 className="edit-cost" onClick={props.toEdit}>
              关联SO
            </Btn2>
          )}
        />

        <div className="cost-item">
          <div className="cost-box">
            <span className="label">合同金额</span>
            <Money className="value" format unit digit="2" text={ctAmount} />
          </div>
          <div className="cost-box">
            <span className="label">销售金额</span>
            <Money className="value" format unit digit="2" text={payAmount} />
          </div>
        </div>
        {refundAmount > 0 ? (
          <div className="refund-box">
            <span>已退金额:</span>
            <Money
              className="value"
              format
              unit
              digit="2"
              text={refundAmount}
            />
          </div>
        ) : null}

        {ctAmount > payAmount ? (
          <div className="memo-box">
            <span className="label">备注</span>
            <BnqTextArea
              placeholder="已收金额小于应收金额请填写备注"
              showCount
              rows={5}
              maxCount={300}
              type="card"
              defaultValue={remarkRef.current}
              onChange={onChangeText}
              onFocus={props.onIntoView}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default forwardRef(TabForm1);
