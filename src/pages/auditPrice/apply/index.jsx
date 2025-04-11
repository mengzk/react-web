/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BnqButton, Dialog, BnqToast } from "mobilecomponet";

import Header from "../../../components/header/index";

import ApplyOrderView from "../component/applyOrder";
import ApplyContractView from "../component/applyContract";

import { hideAppHeader, toTaskPage, onH5Close } from "../../../libs/bnq";
import { getPageQuery } from "../../../utils";
import { initAuditPrice, queryAuditPriceAuth, finishAuditPrice } from "../../../apis/btsales";

import nextIc from "../../../assets/icon/back_b.png";
import "./index.less";

const statusColors = ["gray", "blue", "green", "red", "gray", "gray"];
function ApplyAudit(props) {
  const navigate = useNavigate();
  const { soCode, soType, cpaCode } = getPageQuery();
  const [authList, setAuthList] = useState([]);
  const [detail, setDetail] = useState({});
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    hideAppHeader();
    initData();
  }, []);

  async function initData() {
    const { succeed, data } = await initAuditPrice(soCode, soType);
    if (succeed) {
      const color = statusColors[data.cpaStatus || 0]; // 1:审批中，2:已通过，3:已驳回, 4:已撤回)
      data.color = color;
      setDetail(data);
      getAuth(data.cpaCode);
    }
  }

  // 获取数据
  async function getAuth(cpa) {
    const { succeed, data } = await queryAuditPriceAuth(cpa || soCode);
    if (succeed && data) {
      const buttons = data.buttons || [];
      setAuthList(buttons);
    }
  }

  async function onFinish() {
    const { succeed } = await finishAuditPrice(detail.id);
    if (succeed) {
      BnqToast.show({ content: "完成传单成功", icon: 'success' });
      const timer = setTimeout(() => {
        clearTimeout(timer);

        initData();
        getAuth();
      }, 1000);
    }
  }

  // 完成
  function onComplete() {
    Dialog.show({
      title: "确认完成传单?",
      content: "确认后流程将跳转至下一个节点",
      hasCancel: true,
      ok: "完成",
      type: "row",
      actionType: "fill",
      onPress: (res) => {
        if (res.action == "confirm") {
          onFinish();
        }
      },
    });
  }

  // 提交
  const onApproval = () => {
    toTaskPage(detail.procInsId);
  };

  // 跳转详情
  function toDetail() {
    toTaskPage(detail.procInsId);
  }

  // 跳转遗留单
  function toRemain() {
    const sap = detail.cpaCode || "";
    navigate(`/auditPrice/remain?cpa=${sap}`);
  }

  // 跳转完成审价
  function toComplete() {
    const id = detail.id || "";
    navigate(`/auditPrice/approval?soCode=${soCode}&soType=${soType}&aid=${id}`);
  }

  // 编辑
  function toEdit() {
    navigate(`/auditPrice/create?soCode=${soCode}&soType=${soType}`);
  }

  // 右侧按钮
  function rightView() {
    let item = authList.find((item) => item.buttonIndex == 70); // 70:审价填写,80:遗留单,
    if (item) {
      return (
        <div className="right-view" onClick={toComplete}>
          <span>{item.buttonText}</span>
        </div>
      );
    } else {
      item = authList.find((item) => item.buttonIndex == 80);
      if (item) {
        return (
          <div className="right-view" onClick={toRemain}>
            <span>{item.buttonText}</span>
          </div>
        );
      } else {
        return null;
      }
    }
  }

  // 按钮 60:完成, 50:去审核
  function btnViews() {
    const tag = detail.cpaStatus || 0; // 0:待提交，1:审批中，2:已通过，3:已驳回, 4:已撤回)
    switch (tag) {
      case 0:
      case 3:
      case 4:
        return (
          <div className="footer-actions">
            <BnqButton block onClick={toEdit}>
              重新编辑
            </BnqButton>
          </div>
        );
      case 1:
      case 2:
        let item = authList.find((item) => item.buttonIndex == 50);
        if (item) {
          return (
            <div className="footer-actions">
              <BnqButton block onClick={onApproval}>
                {item.buttonText}
              </BnqButton>
            </div>
          );
        } else {
          item = authList.find((item) => item.buttonIndex == 60);
          if (item) {
            return (
              <div className="footer-actions">
                <BnqButton block onClick={onComplete}>
                  {item.buttonText}
                </BnqButton>
              </div>
            );
          } else {
            return null;
          }
        }
      default:
        return null;
    }
  }

  return (
    <div className="oaa-apply-audit">
      <Header
        title="下单审核"
        rightView={rightView}
        onBack={() => onH5Close()}
      />
      <div className="scroll flex-box">
        <div className="box-a">
          <div className="cell-top" onClick={toDetail}>
            <span className="title">全屋定制遗留单审批</span>
            <span className={`status ${detail.color}`}>
              {detail.cpaStatusLabel}
            </span>
            <span className="hint">详情</span>
            <img className="next" src={nextIc} />
          </div>
          <div className="desc">
            <span>发起人：</span>
            <span>{detail.startProcessFullName || "-"}</span>
          </div>
          <div className="desc">
            <span>发起时间：</span>
            <span>{detail.startProcessTime || "-"}</span>
          </div>
          {detail.approvalRemark ? (
            <div className="reason">
              <span>驳回原因:</span>
              <span>{detail.approvalRemark}</span>
            </div>
          ) : null}
        </div>
        <ApplyContractView info={detail} />
        <ApplyOrderView info={detail} />
      </div>
      {btnViews()}
    </div>
  );
}

export default ApplyAudit;
