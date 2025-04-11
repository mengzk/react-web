/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect, useRef } from "react";
import { BnqButton, BnqToast } from "mobilecomponet";

import Header from "../../../components/header";
import BaseInfoView from "./baseInfo";
import OrderView from "./order";
import AttachView from "./attach";

import {
  queryCPALegacyInit,
  cpaLegacyCreate,
  cpaLegacySave,
  queryCPALegacyInfo,
} from "../../../apis/btsales";

import "./index.less";
import { getPageQuery, checkMobile } from "../../../utils";
import { isIOSDevice } from "../../../utils/device";
const isIos = isIOSDevice();

function RemainAdd(props) {
  const { cpa, id } = getPageQuery();
  const baseRef = useRef(null);
  const orderRef = useRef(null);
  const attachRef = useRef(null);
  const [options, setOptions] = useState({});
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getInitData();
  }, []);

  // 获取遗留单初始化
  async function getInitData() {
    const { succeed, data } = await queryCPALegacyInit(cpa);
    if (succeed) {
      setOptions(data);
      getDetail();
    }
  }

  // 获取遗留单详情
  async function getDetail() {
    if (id) {
      const { succeed, data } = await queryCPALegacyInfo(id, cpa);
      if (succeed) {
        setDetail(data);
      }
    }
  }

  // 保存
  const onSave = async () => {
    const params = getParams(false);
    const { succeed, data } = await cpaLegacySave(params);
    if (succeed) {
      BnqToast.show({ content: "保存成功", icon: "success" });
    }
  };

  // 提交
  const onCommit = async () => {
    const params = getParams(true);
    if (!params) {
      return;
    }
    params.id = id;
    params.cpaLegacyCode = detail.cpaLegacyCode;
    const { succeed, data } = await cpaLegacyCreate(params);
    if (succeed) {
      BnqToast.show({ content: "创建遗留单成功", icon: "success" });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        window.history.back();
      }, 1000);
    }
  };

  function getParams(add) {
    const base = baseRef.current.getData();
    const cpaLegacyItemList = orderRef.current.getData();
    const cpaFileInfoGroupList = attachRef.current.getData();

    if (add) {
      let content = "";
      if (!base.brandCode) {
        content = "请选择品牌";
      } else if (!base.customerName) {
        content = "客户名称 不能为空";
      } else if (!base.customerMobile) {
        content = "客户手机号 不能为空";
      } else if (!checkMobile(base.customerMobile)) {
        content = "客户手机号 格式不正确";
      } else if (typeof base.cpaLegacyType != "number") {
        content = "请选择遗留单类型";
      } else if (!base.cpaLegacyAmount > 0) {
        content = "遗留单欲下单预估金额 不能为0";
      } else if (!base.cpaLegacyRemark) {
        content = "遗留单情况说明 不能为空";
      } else if (cpaLegacyItemList.length < 1) {
        // content = "遗留单列表 不能为空";
        return null;
      } else if (cpaFileInfoGroupList?.length < 1) {
        content = "附件 不能为空";
      }

      if (content) {
        BnqToast.show({ content });
        return null;
      }
    }

    return { cpaCode: cpa, ...base, cpaFileInfoGroupList, cpaLegacyItemList };
  }

  function onIntoView(tag) {
    if (isIos) {
      return;
    }
    const rect = tag.target.getBoundingClientRect();
    const offsetBottom = window.innerHeight - rect.bottom; // 视口高度减去元素底部位置
    console.log("---> onIntoView bottom", offsetBottom);
    if (offsetBottom <= 330) {
      const body = document.getElementById("scroll-div");
      if (body) {
        const height = body.scrollTop - offsetBottom + 330;
        console.log("---> onIntoView -", height);
        body.scrollTo({ top: height, behavior: "smooth" });
      }
    }
  }

  return (
    <div className="oara-remain-add">
      <Header title="创建遗留单" />
      <div id="scroll-div" className="scroll flex-box">
        <BaseInfoView ref={baseRef} option={options} data={detail} onIntoView={onIntoView} />
        <OrderView ref={orderRef} option={options} data={detail} onIntoView={onIntoView}/>
        <AttachView ref={attachRef} option={options} data={detail} />
      </div>
      <div className="footer-actions">
        <BnqButton color="light" block onClick={onSave}>
          保存
        </BnqButton>
        <BnqButton block onClick={onCommit}>
          提交遗留单
        </BnqButton>
      </div>
    </div>
  );
}

export default RemainAdd;
