/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */
import React, { useState, useEffect } from "react";

import CellLabel from "../../../../components/cell-label";
import Money from "../../../../components/money";

import upIc from "../../../../assets/icon/back_b.png";
import "./index.less";

//
function ApplyContractView(props) {
  const info = props.info || {};
  const [list, setList] = useState([]);
  const [soList, setSoList] = useState([]);
  const [showSo, setShowSo] = useState(false);
  const [ctAmount, setCtAmount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const memoStr = info?.collectionInfo?.reason || "";

  useEffect(() => {
    if (props.info) {
      const { contractInfoList, collectionInfo } = props.info;
      if (contractInfoList && contractInfoList.length > 0) {
        let total = 0;
        let refund = 0;
        contractInfoList.forEach((item) => {
          if (item.checked) {
            total += item.contractAmount || 0;
            refund += item.refundAmount || 0;
          }
        });
        setCtAmount(total);
        setRefundAmount(refund);
        setPayAmount(collectionInfo?.paidAmount || 0);
        setList(contractInfoList);
        setSoList(collectionInfo.soInfoList||[]);
      }
    }
  }, [props.info]);


  // so列表
  function soView(item, index) {
    return (
      <div className="so-item" key={index}>
        <span className="title">SO单号：{item.sapSoCode}</span>
          <span className="desc">客户姓名：{item.customerName || "-"}</span>
          <span className="desc">会员卡号：{item.customerCardCode}</span>
          <span className="desc">
            销售金额：
            <span className="price">{item.paidAmount}元</span>
          </span>
          {item.refundAmount ? <span className="desc">
            已退金额：
            <span className="price">{item.refundAmount}元</span>
          </span>:null}
          <span className="desc">创建时间：{item.orderCreateTime || "-"}</span>
      </div>
    );
  }

  // 合同列表
  function itemView(item, index) {
    return (
      <div className="contract" key={index}>
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
    );
  }

  return (
    <div className="cap-contract-info">
      <div className="box-a">
        <CellLabel title="合同" />
        {list.map(itemView)}
      </div>
      <div className="box-a">
        <CellLabel title="收款" />

        <div className="cost-item">
          <div className="cost-box">
            <span className="label">合同金额</span>
            <Money className="value" format unit digit="2" text={ctAmount} />
          </div>
          <div className="cost-box">
            <span className="label">销售金额</span>
            <div className="cast-expand">
              <Money className="value" format unit digit="2" text={payAmount} />
              <img className={`expand ${showSo? 'up':''}`} src={upIc} onClick={() => setShowSo(!showSo)}/>
            </div>
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

        {showSo && soList.length > 0 ? (
          <div className="so-list">
            {soList.map(soView)}
          </div>
        ) : null}

        {memoStr ? (
          <div className="memo-box">
            <span className="label">备注</span>
            <span>{memoStr}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ApplyContractView;
