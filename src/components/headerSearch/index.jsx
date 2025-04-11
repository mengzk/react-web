/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc:
 */
import React, { useState, useEffect } from "react";
import { Search } from "mobilecomponet";

import backIcon from "../../assets/icon/back_b.png";

import "./index.css";

function SearchHeader(props) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(props.value || "");
  }, [props.value]);

  function onBack() {
    if (props.onBack) {
      props.onBack();
    } else {
      window.history.back();
    }
  }

  function gotoSearch() {
    if (props.onSearch) {
      props.onSearch(keyword, 'search');
    }
  }

  function onSearchResult(tag, value) {

    console.log("gotoSearch", tag);
    let text = value || "";
    if (tag == "clear") {
      setKeyword("");
    }
    if (tag == "input") {
      setKeyword(text);
    }
    if (props.onSearch) {
      props.onSearch(text, tag);
    }
  }

  return (
    <>
      <div className="v-search-header">
        <div className="v-search-header-btn" onClick={onBack}>
          <img className="v-search-header-back" src={backIcon} />
        </div>
        <Search
          placeholder={props.hint || "请输入关键字"}
          readOnly={props.readOnly}
          value={keyword}
          onClick={gotoSearch}
          onResult={onSearchResult}
        />
        <div className="v-search-header-right"></div>
      </div>
      {/* <div className="v-search-header-height" /> */}
    </>
  );
}

export default SearchHeader;
