/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 *  // {
    //   id: 13,
    //   cpaId: 8,
    //   cpaCode: "CPA2025033100005",
    //   cpaLegacyCode: "CPALG20250331000004",
    //   cpaLegacyStatus: 3,
    //   cpaLegacyStatusDesc: "已驳回",
    //   brandName: "金牌",
    //   problemCheckStatus: 1,
    //   cpaLegacyType: 1, // 0套增遗留单 1非套增遗留单
    //   cpaLegacyAmount: 200.2,
    //   applicantName: "周杰伦",
    //   applicantTime: "2025-04-01 10:04",
    // },
 */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { BnqButton, BnqEmpty, PullToRefresh } from "mobilecomponet";

import Header from "../../../components/header";
import Btn2 from "../../../components/btn2";

import { queryCPALegacyPage, queryCPALegacyAuth } from "../../../apis/btsales";

import nextIc from "../../../assets/icon/back_b.png";
import "./index.less";
import { getPageQuery } from "../../../utils";
import { toTaskPage } from "../../../libs/bnq";

const statusColors = ["blue", "blue", "green", "red", "gray", "gray"];
//
function RemainList(props) {
  const navigate = useNavigate();
  const { cpa } = getPageQuery();
  const position = useRef(0);
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getActionAuth();
    getListData();
  }, []);

  // 获取遗留单列表
  async function getListData() {
    const { succeed, data } = await queryCPALegacyPage(cpa, position.current);
    if (succeed) {
      setList(data);
      setLoaded(true);
    }
  }

  // 获取遗留单列表权限
  async function getActionAuth() {
    const { succeed, data } = await queryCPALegacyAuth(cpa);
    if (succeed) {
      // buttonIndex
      const arr = data.buttons || [];
      const hasAdd = arr.some((e) => e.buttonIndex == 300);
      setAuth(hasAdd);
    }
  }

  // 跳转详情
  function toDetail(item) {
    // 0待提交,3已驳回,4已撤回 可重新编辑
    const statusList = [0, 3, 4];
    const status = item.cpaLegacyStatus || 0;

    if (statusList.includes(status)) {
      if (auth) {
        navigate(`/auditPrice/remainAdd?cpa=${cpa}&id=${item.id}`);
      } else {
        BnqToast.show({ content: "暂无权限" });
      }
    } else {
      toTaskPage(item.procInsId);
    }
  }

  // 创建遗留单
  function onCreate() {
    navigate(`/auditPrice/remainAdd?cpa=${cpa}`);
  }

  // 行项目
  function itemView(item, index) {
    const statusCo = statusColors[item.cpaLegacyStatus || 0];
    const statusClass = `status ${statusCo}`;

    return (
      <div className="item" key={index}>
        <Btn2 className="cell-top" onClick={() => toDetail(item)}>
          <span className="title">全屋定制遗留单审批</span>
          <span className={statusClass}>{item.cpaLegacyStatusDesc}</span>
          <span className="hint">详情</span>
          <img className="next" src={nextIc} />
        </Btn2>
        <span className="desc">发起人：{item.applicantName || "-"}</span>
        <span className="desc">发起时间：{item.applicantTime || "-"}</span>
        <div className="info">
          <div className="cell">
            <span>品牌：</span>
            <span>{item.brandName}</span>
          </div>
          <div className="cell">
            <span>遗留单单号：</span>
            <span>{item.supplierLegacyCodes || "-"}</span>
          </div>
          <div className="cell">
            <span>遗留单类型：</span>
            <span>
              {item.cpaLegacyType == 0 ? "套增遗留单" : "非套增遗留单"}
            </span>
          </div>
          <div className="cell">
            <span>下单预估金额：</span>
            <span>{item.cpaLegacyAmount || "-"}元</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="oarl-remain">
      <Header title="遗留单" />
      <div className="list">
        <PullToRefresh onRefresh={getListData}>
          {list.map(itemView)}
        </PullToRefresh>
        {loaded && list.length < 1 ? (
          <BnqEmpty type="data" style={{ marginTop: "96px" }} />
        ) : null}
      </div>
      {auth ? (
        <div className="footer-actions">
          <BnqButton block onClick={onCreate}>
            创建遗留单
          </BnqButton>
        </div>
      ) : null}
    </div>
  );
}

export default RemainList;
