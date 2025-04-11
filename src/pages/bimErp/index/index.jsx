/**
 * Author: Meng
 * Date: 2025-02-25
 * Modify: 2025-02-25
 * Desc:
 * http://localhost:8067/bimerpH5?word=&token=MTAwMDYwMzg=
 */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import { BnqEmpty, BnqToast } from "mobilecomponet";

import ListHeader from "../component/listHeader2/index";
import ListItem from "../component/ListItem";
import TopFilter from "../component/topFilter1";
import TopFilte2 from "../component/topFilter2";
import GuideErp from "../component/guide";

import {
  getPackageConfigData,
  getPackageParamFilterData,
} from "../../../apis/erp";
import { onDownFile, onShareFile, setHeaderConfig } from "../../../libs/bnq";
import useErpConfig from "../../../stores/useErpConfig";
import Session from "../../../stores/session";
import { getPageQuery, updateHrefParams } from "../../../utils";

import "./index.less";

const TAB_KEY = "erp-tab-key";
let downAction = false;
//
function IndexPage(props) {
  const navigate = useNavigate();
  const { configData, setErpConfig, getErpConfig } = useErpConfig(
    (state) => state
  );
  const { token = "", other } = getPageQuery();
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [itemList, setItemList] = useState([]);
  const params2 = useRef({
    shopCode: "",
    setNo: "",
  });
  const params3 = useRef({
    shopCode: "",
    setNo: "",
    protuctType: "",
    groupName: "",
    spaceName: "",
    skuCode: "",
    currentPage: 1,
    pageSize: 10,
    tabId: "list",
    selectType: 2,
  });

  useEffect(() => {
    setHeaderConfig({ hideNav: true });
    const tab = sessionStorage.getItem(TAB_KEY);
    setCurrent(tab ? parseInt(tab) : 0);
    sessionStorage.removeItem(TAB_KEY);
    queryConfig();
    if (other) {
      const param1 = JSON.parse(decodeURIComponent(other));
      params3.current = {
        ...params3.current,
        ...param1,
      };
    }
  }, []);
  useEffect(() => {
    return () => {
      sessionStorage.setItem(TAB_KEY, current);
    };
  }, [current]);

  async function queryConfig() {
    const erpData = getErpConfig(); // 获取缓存
    if (erpData && erpData.length > 0) {
      return;
    }

    let str = token;
    if (!token) {
      str = Session.getData("token");
    }
    const { code, data } = await getPackageParamFilterData(str);
    if (code == 200) {
      setErpConfig(data);
    }
  }

  async function queryExcelUrl(params) {
    const { code, data } = await getPackageConfigData(params3.current);
    if (code == 200) {
      // console.log("data--->", data);
      if (downAction) {
        onDownFile(data.url);
      } else {
        const title = data.url.split("/").pop();
        onShareFile(data.url, title);
      }
    }
  }

  // 切换tab
  function onChangeTab(num) {
    setCurrent(num);
    sessionStorage.setItem(TAB_KEY, num);
    if (other && num == 0) {
      // updateHrefParams({other: ''});
    }
  }

  // 跳转
  function onItemAction(tag, item) {
    // console.log("action--->", item);
    if (tag == "share") {
      if (current == 1) {
        downAction = false;
        queryExcelUrl();
      }
    } else {
      if (current == 0) {
        // queryPDFData(item.value, item.shop);
        params3.current.setNo = item.value;
        params3.current.shopCode = item.shop;
        navigate(`/bimerp/report?setNo=${item.value}&shopCode=${item.shop}`);
      } else {
        if (tag == "down") {
          downAction = true;
          queryExcelUrl();
        } else {
          BnqToast.show({ content: "文件不支持预览" });
        }
      }
    }
  }

  // 筛选
  function gotoFilter() {
    const res = current == 1 ? params3.current : params2.current;
    navigate(`/bimerp/filter?setNo=${res.setNo}&shopCode=${res.shopCode}`);
  }

  // 筛选数据
  function onListData(data) {
    // console.log("list--->", data);
    if (data) {
      setItemList(data);
      if (data.length > 0) {
        const item = data[0];
        if(current == 0) {
          params2.current.setNo = item.value;
          params2.current.shopCode = item.shop;
        }else {
          params3.current.setNo = item.value;
          params3.current.shopCode = item.shop;
        }
      }
    }
    setLoaded(true);
  }

  return (
    <div className="erp-page">
      <ListHeader onChange={onChangeTab} current={current} />
      {current == 0 ? (
        <TopFilter
          data={configData}
          gotoFilter={gotoFilter}
          onChange={onListData}
        />
      ) : (
        <TopFilte2
          data={configData}
          gotoFilter={gotoFilter}
          onChange={onListData}
        />
      )}

      <div className="flex-box">
        <div className="list-box">
          {itemList.map((item, index) => (
            <ListItem
              key={`${current}-${index}`}
              tag={current}
              item={item}
              onAction={onItemAction}
            />
          ))}
          {loaded && itemList.length < 1 ? (
            <div className="list-empty">
              <BnqEmpty
                type="data"
                description="请先进行筛选，再查看相关资料"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <GuideErp />
    </div>
  );
}

export default IndexPage;
