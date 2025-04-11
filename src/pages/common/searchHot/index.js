/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */

import React, { useState, useEffect } from "react";
import { BnqToast } from "mobilecomponet";
import { getPageQuery } from "../../../utils/index";
import { setHeaderConfig } from "../../../libs/bnq";

import SearchHeader from "../../../components/headerSearch";

import delIc from "../../../assets/icon/del_g.png";
import "./index.less";

const SaveKey = "search_history";
// 搜索页
function SearchHot(props) {
  const key = props.key || SaveKey;
  const word = props.word || "";
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHeaderConfig({ hideNav: true });
    const history = localStorage.getItem(key);
    if (history) {
      setHistory(JSON.parse(history));
    }
  }, []);

  // 搜索历史变化
  function onChange(word) {
    // 保存到本地 -最多存 10条 记录
    const length = history.length;
    if (length >= 10) {
      history.pop();
    }
    const list = history.filter((item) => item != word);
    list.unshift(word);
    setHistory([...list]);
    localStorage.setItem(key, JSON.stringify(list));
  }

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

  function onSearch(word) {
    if (!word) {
      BnqToast.show({ content: "请输入内容" });
      return;
    }
    onChange(word);

    const query = getPageQuery();
    // 跳转到搜索结果页
    if (props.onSearch) {
      props.onSearch(word);
    } else {
      sessionStorage.setItem(
        query.saveKey || "search_reault",
        JSON.stringify({ ...query, word })
      );
      window.history.back();
    }
  }

  return (
    <div className="sh-search-bot">
      <SearchHeader
        placeholder={props.placeholder || "请输入搜索关键字"}
        maxLength={20}
        value={word}
        onSearch={onResult}
      />

      <div className="history-box">
        {history.length > 0 ? (
          <div className="history-title-label">
            <span className="title-text">搜索历史</span>
            <img className="history-clear" src={delIc} onClick={onClear} />
          </div>
        ) : null}
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
      <div className="hot-box">
        <div className="hot-title">热门搜索</div>
        <div className="hot-list">
          <div className="hot-item">热门搜1</div>
          <div className="hot-item">热门2</div>
          <div className="hot-item">热索3</div>
          <div className="hot-item">热门4</div>
          <div className="hot-item">热门搜索5</div>
          <div className="hot-item">热门索6</div>
        </div>
      </div>
    </div>
  );
}

export default SearchHot;
