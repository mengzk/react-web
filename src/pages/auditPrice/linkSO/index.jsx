/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 * {
      "shopCode": "1004",
      "shopName": "上海龙阳店",
      "sapSoCode": "0230007011",
      "customerName": "姓名未知",
      "customerMobile": "15921545997",
      "customerCardCode": "880991755137",
      "realFee": 83.00,
      "orderCreateTime": "2023-10-27 19:02:01",
      "cpaCode": null,
      "soRelationStatus": 0,
      "soRelationStatusLabel": "可关联"
    }
 */

import React, { useState, useEffect } from "react";
import { Dialog, BnqEmpty, BnqToast } from "mobilecomponet";

import SearchView from "../../common/searchView";
import MatchChar from "../../../components/matchChar";

import { getPageQuery } from "../../../utils";
import { querySoPage, saveSoMapping } from "../../../apis/btsales";

import "./index.less";

function LinkSO(props) {
  const { sapCode, cid, soCode, soType } = getPageQuery();
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, []);

  // 获取数据
  async function queryData(text) {
    const { succeed, data } = await querySoPage(soCode, soType, text);
    if (succeed) {
      setLoaded(true);
      setList(data);
    }
  }

  // 关联SO单
  async function saveSoItem(item) {
    const { succeed } = await saveSoMapping(item.sapSoCode, soCode, soType, cid);
    if (succeed) {
      BnqToast.show({ content: "关联成功", icon: 'success' });
      // 更新列表
      const newList = list.map((i) => {
        if (i.sapSoCode == item.sapSoCode) {
          return { ...i, soRelationStatus: 2 };
        }
        return i;
      });
      setList(newList);
    }
  }

  function onClear() {
    setKeyword("");
    setList([]);
  }

  function onSearch(text) {
    setKeyword(text);
    if (text) {
      queryData(text);
    } else {
      setList([]);
    }
  }

  // 点击关联
  function onLink(item) {
    // soRelationStatus 0 可关联 1 已关联 2 不可关联
    if (item.soRelationStatus == 0) {
      Dialog.show({
        title: "确定关联SO单号？",
        hasCancel: true,
        ok: "关联",
        type: "row",
        actionType: "fill",
        onPress: (res) => {
          if(res.action == 'confirm') {
            saveSoItem(item);
          }
        },
      });
    } else if (item.soRelationStatus == 1) {
      Dialog.show({
        title: "确定关联SO单号？",
        content: `关联后将自动取消  已关联的派工单：${item.sapSoCode}`,
        hasCancel: true,
        ok: "确定",
        type: "row",
        actionType: "fill",
        onPress: (res) => {
          if(res.action == 'confirm') {
            saveSoItem(item);
          }
        },
      });
    } else {
      BnqToast.show({ content: "此SO单，不可关联" });
    }
  }

  // 行项目
  function itemView(item, index) {
    const so = item.soRelationStatus;
    const key = `${item.sapSoCode}${so}`;
    return (
      <div className="item" key={key}>
        <div className="info">
          <div className="title">
            <span>SO单号：</span>
            <MatchChar word={keyword} text={item.sapSoCode} color="#3478F6" />
          </div>
          <span className="desc">客户姓名：{item.customerName}</span>
          <span className="desc">会员卡号：{item.customerCardCode}</span>
          <span className="desc">
            销售金额：
            <span className="price">¥{item.realFee}</span>
          </span>
          <span className="desc">创建时间：{item.orderCreateTime}</span>
          {item.cpaCode && so == 1 ? (
            <span className="desc">已关联审价单：{item.cpaCode}</span>
          ) : null}
        </div>
        {so < 2 ? (
          <span className="item-btn" onClick={() => onLink(item)}>
            关联
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <SearchView onSearch={onSearch} onClear={onClear} hint="请输入SO单号">
      <div className="list oasl-link-so">
        <div className="res-list">{list.map(itemView)}</div>
        {list.length < 1 && loaded ? (
          <BnqEmpty type="data" style={{ marginTop: "96px" }} />
        ) : null}
      </div>
    </SearchView>
  );
}

export default LinkSO;
