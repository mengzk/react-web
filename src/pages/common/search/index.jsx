/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 *  搜索页 - 搜索框
 *  使用方法：
 *  <SearchView
 *    onSearch={(text) => {}}
 *    onClear={() => {}}
 *    hint="请输入搜索关键字"
 *    word="默认搜索文字"
 *    store="存储搜索历史的 key"/>
 */

import React, { useState, useEffect } from "react";
import { BnqToast } from "mobilecomponet";
import { setHeaderConfig } from "../../../libs/bnq";

import SearchHeader from "../../../components/headerSearch";

import delIc from "../../../assets/icon/del_g.png";
import "./index.less";

// 搜索页
function Search3(props) {
  const key = props.store || 'search_history';
  const word = props.word || "";
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHeaderConfig({ hideNav: true });
    const history = localStorage.getItem(key);
    if (history) {
      setHistory(JSON.parse(history));
    }
  }, []);

  function onClear() {
    localStorage.removeItem(key);
    setHistory([]);
  }

  function onResult(text, tag) {
    // console.log("--->", tag, text);
    if (tag == "ok") {
      onSearch(text);
    }
  }

  function onSearch(word='') {
    // if (!word) {
    //   BnqToast.show({ content: "请输入内容" });
    //   return;
    // }
    // 跳转到搜索结果页
    if(props.onSearch) {
      props.onSearch(word);
    }
  }

  return (
    <div className="sc-search">
      <SearchHeader
        hint={props.hint || "请输入搜索关键字"}
        maxLength={20}
        value={word}
        onSearch={onResult}
      />

      <div className="history-box">
        {history.length > 0 ? <div className="history-title-label">
          <span className="title-text">搜索历史</span>
          <img className="history-clear" src={delIc} onClick={onClear} />
        </div>:<></>}
        <div className="history-list">
          {history.map((item, index) => {
            return (
              <div
                key={index}
                className="history-item"
                onClick={() => onSearch(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search3;
