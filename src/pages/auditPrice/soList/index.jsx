/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BnqButton, BnqEmpty, Dialog, BnqToast } from "mobilecomponet";

import Header from "../../../components/header/index";

import { queryLinkSo, deleteSoMapping } from "../../../apis/btsales";
import { getPageQuery } from "../../../utils";

import delIc from "../../../assets/icon/del_g.png";
import "./index.less";

function SOList(props) {
  const navigate = useNavigate();
  const { sapCode, cid, soCode, soType } = getPageQuery();
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getListData();
  }, []);

  // 获取数据
  async function getListData() {
    const { succeed, data } = await queryLinkSo(soCode, soType);
    if (succeed) {
      setLoaded(true);
      setList(data);
    }
  }

  // 删除SO
  async function deleteSoItem(ssCode) {
    const cpaId = parseInt(cid||'0');
    const params = {};
    if (cpaId > 0) {
      params.cpaId = cpaId;
      params.sapSoCode = ssCode;
    } else {
      params.sourceOrderCode = soCode;
      params.sourceOrderType = soType;
      params.sapSoCode = ssCode;
    }
    const { succeed } = await deleteSoMapping(params);
    if (succeed) {
      BnqToast.show({ content: "删除成功", icon: 'success' });
      getListData();
    }
  }

  // 删除
  function onDelete(ssCode) {
    Dialog.show({
      title: "确定删除该关联SO单号？",
      hasCancel: true,
      ok: "删除",
      type: "row",
      actionType: "fill",
      okStyle: {
        background: "#FF2626",
      },
      onPress: (res) => {
        if (res.action == "confirm") {
          deleteSoItem(ssCode);
        }
      },
    });
  }

  // 编辑SO
  function onSearch() {
    navigate(
      `/auditPrice/linkSO?sapCode=${sapCode}&cid=${cid||0}&soCode=${soCode}&soType=${soType}`
    );
  }

  // 行项目
  function itemView(item, index) {
    return (
      <div className="item" key={index}>
        <div className="info">
          <span className="title">SO单号：{item.sapSoCode}</span>
          <span className="desc">客户姓名：{item.customerName || "-"}</span>
          <span className="desc">会员卡号：{item.customerCardCode}</span>
          <span className="desc">
            销售金额：
            <span className="price">{item.paidAmount}元</span>
          </span>
          {item.refundAmount ? (
            <span className="desc">
              已退金额：
              <span className="price">{item.refundAmount}元</span>
            </span>
          ) : null}
          <span className="desc">创建时间：{item.orderCreateTime || "-"}</span>
        </div>
        <img
          className="item-icon"
          src={delIc}
          onClick={() => onDelete(item.sapSoCode)}
        />
      </div>
    );
  }

  return (
    <div className="oasl-so-list">
      <Header title="关联SO单" />
      <div className="list">
        <div className="so-list">{list.map(itemView)}</div>
        {loaded && list.length < 1 ? (
          <BnqEmpty type="data" style={{ marginTop: "96px" }} />
        ) : null}
      </div>
      <div className="footer-actions">
        <BnqButton block onClick={onSearch}>
          搜索关联SO单
        </BnqButton>
      </div>
    </div>
  );
}

export default SOList;
