/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { BnqButton, BnqToast } from "mobilecomponet";

import Header from "../../../components/header";
// import CellLabel from "../../../components/cell-label";
import InputBox from "../../../components/inputBox";

import { getPageQuery } from "../../../utils";
import { saveAuditPriceResult, initAuditPrice } from "../../../apis/btsales";

import "./index.less";

function Approval(props) {
  const { soCode, soType, aid } = getPageQuery();
  // const [detail, setDetail] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    const { succeed, data } = await initAuditPrice(soCode, soType);
    if (succeed) {
      const groupList = data.fillResultInfoGroupList || [];
      setList(groupList);
    }
  }

  // 提交
  const onCommit = async () => {
    const arr = [];
    list.forEach((item) => {
      if (item.checked) {
        const list2 = item.itemList || [];
        list2.forEach((e) => {
          if (!e.itemValue) {
            arr.push(`${item.groupName}: ${e.itemName}`);
          }
        });
      }
    });
    if (arr.length > 0) {
      const alert = arr[0] + " 不能为空";
      BnqToast.show({ content: alert });
      return;
    }
    const id = parseInt(aid||'0');
    if(id) {
      const params = { id, itemList: list };
      const { succeed, data } = await saveAuditPriceResult(params);
      if (succeed) {
        BnqToast.show({ content: "提交成功", icon: 'success' });
        setTimeout(() => {
          window.history.back();
        }, 1000);
      }
    }
  };

  function itemView(item, index) {
    const items = item.itemList || [];
    const clsName = items.length > 1 ? "input-grid" : "input-group";

    return (
      <div className="box-apl goods" key={index}>
        <div className="label-box" onClick={() => onSelect(item)}>
          <span className="label">{item.groupName}</span>
        </div>

        {item.checked ? (
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
                  onChange={(text) => {
                    list[index].itemList[idx].itemValue = text;
                    setList([...list]);
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="oaa-approval">
      <Header title="审价填写" />
      <div className="scroll">{list.map(itemView)}</div>
      <div className="footer-actions">
        <BnqButton block onClick={onCommit}>
          保存
        </BnqButton>
      </div>
    </div>
  );
}

export default Approval;
