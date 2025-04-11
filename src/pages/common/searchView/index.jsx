/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 搜索页 - 搜索框
 *   使用方法：
 *  <SearchView
 *    onSearch={(text) => {}}
 *    onClear={() => {}}
 *    hint="请输入搜索关键字">
 *    <div className="list">
 *      {list.map((item, index) => (
 *        <div key={index} className="item">
 *          <h1>Item {item}</h1>
 *        </div>
 *      ))}
 *    </div>
 *  </SearchView>
 * 注意：onSearch 和 onClear 事件必须传入
 *  onSearch: 搜索事件
 *  onClear: 清除事件
 *  hint: 提示文字
 *  text: 默认搜索文字
 *  store: 存储搜索历史的 key
 */

import React, { useState, useEffect } from "react";

import SearchHeader from "../../../components/headerSearch";
import Search3 from "../search/index";

import "./index.css";

// 搜索页
function SearchView(props) {
  const [visible, setVisible] = useState(true);
  const [word, setWord] = useState("");
  const storeKey = props.store || "search_history"; 
  const hint = props.hint || "请输入搜索关键字";

  useEffect(() => {
    if (props.text) {
      setWord(props.text || "");
    }
  }, [props.text]);

  // 输入变化
  function onChange(text, tag) {
    if (tag == "search") {
      setVisible(true);
    } else {
      if (tag == "clear") {
        props.onClear && props.onClear(); // 清除列表
      } else if (tag == "ok") {
        onSearch(text);
      }
    }
  }
  // 搜索
  function onSearch(text) {
    setWord(text);
    setVisible(false);
    if (props.onSearch) {
      props.onSearch(text || "");
    }
  }

  if (visible) {
    return <Search3 hint={hint} word={word} onSearch={onSearch} store={storeKey}/>;
  } else {
    return (
      <div className="sv-results">
        <SearchHeader
          hint={hint}
          readOnly
          value={word || ""}
          onSearch={onChange}
        />
        {props.children}
      </div>
    );
  }
}

export default SearchView;
