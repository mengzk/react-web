/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { BnqEmpty } from "mobilecomponet";

import SearchHeader from "../../../components/headerSearch";
import Search3 from '../../common/search/index';

import { getPageQuery } from "../../../utils/index";
import { getPackageConfigData } from "../../../apis/erp";
import { setHeaderConfig } from "../../../libs/bnq";

import duiIc from "../../../assets/icon/select_dui.png";
import "./index.less";
const PS = "*";
const SearchKey = "erp-search-result2";
// 搜索页
function ResultList(props) {
  const { word, setNo, shopCode } = getPageQuery();
  const [isSearch, setIsSearch] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setHeaderConfig({ hideNav: true });
    setKeyword(word || "");
  }, []);

  async function getSearchData(text) {
    setIsSearch(false);
    setKeyword(text);
    const { code, data } = await getPackageConfigData({
      shopCode,
      setNo,
      protuctType: "",
      groupName: "",
      spaceName: "",
      skuCode: text,
      currentPage: 1,
      pageSize: 10,
      tabId: "list",
      selectType: 1,
    });
    if (code == 200) {
      setItemList(data.list || []);
    }
    setLoaded(true);
  }

  function gotoSearch(text, tag) {
    if(tag == "search") {
      setIsSearch(true);
    }else {
      if (tag == "clear") {
        setItemList([]);
      }else if(tag == 'ok') {
        getSearchData(keyword);
      }
    }
  }

  function onItemClick(item, index) {
    setCurrent(index);
    sessionStorage.setItem(SearchKey, item.skuCode);
    window.history.back();
    // const path = `/bimerp/filter?setNo=${setNo}&shopCode=${shopCode}`;
    // navigate(`${path}&word=${item.skuCode || ""}`);
  }

  function spanItem(item, id) {
    if (item == PS) {
      return (
        <span key={id} className="word-num">
          {keyword}
        </span>
      );
    }
    return <span key={id}>{item}</span>;
  }

  // 搜索结果列表
  function itemView(item, index) {
    const cls = `list-item ${index == current ? "active" : ""}`;
    let noStr = item.skuCode || '';
    // const word2 = noStr.replaceAll(keyword, `${keyword}${PS}${keyword}`);
    const word2 = noStr.replace(new RegExp(keyword, 'g'), `${keyword}${PS}${keyword}`);
    let noArr = word2.split(keyword);

    return (
      <div key={index} className={cls} onClick={() => onItemClick(item, index)}>
        <span>
          <span>SKU编号：</span>
          {noArr.map(spanItem)}
        </span>
        <span className="item-title">{item.skuName}</span>
        <div className="item-cell">
          <span>商品配置：</span>
          <span>{item.yxConfig}</span>
        </div>
        <div className="item-cell">
          <span>所属空间：</span>
          <span>{item.spaceName}</span>
        </div>
        <div className="item-cell">
          <span>产品类型：</span>
          <span>{item.setName}</span>
        </div>
        {current == index ? <img className="item-dui" src={duiIc} /> : <></>}
      </div>
    );
  }

  if(isSearch) {
    return <Search3 hint="请输入SKU编号" onSearch={getSearchData} />
  }else {
    return (
      <div className="result-list3">
        <SearchHeader
          hint="请输入SKU编号"
          readOnly
          value={keyword || ""}
          onSearch={gotoSearch}
        />
        <div className="flex-box">
          {!loaded || itemList.length > 0 ? (
            <div className="list-box">{itemList.map(itemView)}</div>
          ) : (
            <div className="list-empty">
              <BnqEmpty type="data" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ResultList;
