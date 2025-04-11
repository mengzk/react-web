/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, BnqToast } from "mobilecomponet";
import Header from "../../../components/header/index";

import { getPageQuery, updateHrefParams } from "../../../utils/index";
import { setHeaderConfig } from "../../../libs/bnq";

import "./index.less";

// const data3 = [{
//     title: "门店",
//     isMulti: true,
//     key: "shop",
//     list: [{ list: [ { title: "上海龙阳店10" }, { title: "上海龙阳店11" } ] }],
//   }];
const DataKey = "erp-top-filter2";
const SearchKey = "erp-search-result2";
// 搜索页
function FilterPage(props) {
  const navigate = useNavigate();
  const { word, setNo, shopCode } = getPageQuery();
  const [keyword, setKeyword] = useState("");
  const [filterKey, setFilterKey] = useState("123124");
  const [itemList, setItemList] = useState([{}]);
  const selectRef = useRef({setNo: "", shopCode: ""});

  useEffect(() => {
    setHeaderConfig({ hideNav: true });
    const resultText = sessionStorage.getItem(SearchKey);
    if (resultText) {
      setKeyword(resultText);
      sessionStorage.removeItem(SearchKey);
    } else {
      setKeyword(word || "");
    }
    const json = sessionStorage.getItem(DataKey);
    if (json) {
      const filterDatas = JSON.parse(json);
      // setItemList(filterDatas);
      setFilterData(filterDatas);
    }
    selectRef.current = {setNo, shopCode};
  }, []);

  function setFilterData(filterList) {
    const nKey = ["skuCode"];
    // console.log("filterList--->", filterList);
    const filters = [];
    let list = filterList;
    list = list.filter((e) => !nKey.includes(e.searchKey));
    list.forEach((e) => {
      const options = e.options?.map((v) => ({ ...v, title: v.label })) || [];
      if (e.searchKey == "shopCode") {
        options.forEach((v) => {
          v.type = "watch";
        });
      } else if (e.searchKey == "setNo") {
        e.multiple = true;
      }
      const item = {
        title: e.label?.replace("选择", ""),
        isMulti: e.multiple,
        multiple: e.multiple,
        field: e.searchKey,
        list: [{ title: "", list: options }],
      };
      filters.push(item);
    });
    setItemList(filters);
    // sessionStorage.setItem(DataKey, JSON.stringify(filters));
  }

  function onWatchClick(e) {
    const list = [].concat(itemList);
    // console.log("onWatchClick--->", e, list[0].list[0]);
    const options = e.options?.map((v) => ({ ...v, title: v.label })) || [];

    list[0].list[0]?.list.forEach((l) => {
      l.select = l.value == e.value;
    });
    list[1].list = [{ title: "", list: options }];
    setFilterKey(new Date().getTime());
    setItemList(list);
  }

  // 跳转搜索页
  function gotoSearch() {
    const sel = selectRef.current;
    if(sel.shopCode && sel.setNo) {
    const path = `/bimerp/result?setNo=${sel.setNo}&shopCode=${sel.shopCode}`;
    navigate(`${path}&word=${keyword || ""}`);
    }else {
      BnqToast.show({ content: "请选择门店和套餐套系" });
    }
  }

  function onSearchResult(tag) {
    // console.log("--->", tag);
    if (tag == "clear") {
      setKeyword("");
      // setItemList([]);
      // updateHrefParams({ word: "" });
    }
  }

  function onChange(data) {
    // console.log("--->", data);
    if(data) {
      data.forEach(e => {
        if(e.field == "setNo") {
          let nos = [];
          e.list.forEach((l) => {
            l.list?.forEach((ll) => {
              if(ll.select) {
                nos.push(ll.value);
              }
            });
          });
          selectRef.current.setNo = nos[0]||'';
        }else if(e.field == "shopCode") {
          e.list.forEach((l) => {
            l.list?.forEach((ll) => {
              if(ll.select) {
                selectRef.current.shopCode = ll.value;
              }
            });
          });
        }
      });
    }
    // console.log("selectRef--->", selectRef.current);
  }

  function onConfirm(data) {
    // console.log("---> ok", data);
    const params = {};
    const json = sessionStorage.getItem(DataKey);
    const filterDatas = JSON.parse(json);
    if (data) {
      params.skuCode = keyword;
      data.forEach((e, ind) => {
        const item = (e.list || [])[0];
        const itemList = item?.list || [];
        const list2 = itemList.filter((v) => v.select);
        const filterItem = filterDatas[ind];
        if (filterItem) {
          if (filterItem.searchKey == "setNo") {
            filterDatas[0].options.forEach((fof) => {
              if (fof.select) {
                (filterItem.options || []).forEach((o) => {
                  o.select = list2.some((l) => l.value == o.value);
                });
                fof.options = filterItem.options;
              }
            });
          } else {
            const options = filterItem.options || [];
            options.forEach((o) => {
              o.select = list2.some((l) => l.value == o.value);
            });
          }
        }
        // console.log("list--->", filterItem);
        if (list2 && list2.length > 0) {
          if (e.isMulti) {
            params[e.field] = list2.map((v) => v.value);
          } else {
            params[e.field] = list2[0].value;
          }
        }
      });
    }else {
      filterDatas.forEach((e) => {
        e.options.forEach((o) => {
          o.select = false;
          if(o.options) {
            o.options.forEach((oo) => {
              oo.select = false;
              if(oo.options) {
                oo.options.forEach((ooo) => {
                  ooo.select = false;
                });
              }
            });
          }
        });
      });
    }
    sessionStorage.setItem(DataKey, JSON.stringify(filterDatas));
    const path = `/bimerp?setNo=${setNo}&shopCode=${shopCode}`;
    navigate(`${path}&other=${encodeURIComponent(JSON.stringify(params))}`);
  }

  return (
    <div className="list203-filter">
      <Header title="商品清单筛选" />
      <div className="search203-box">
        <Search
          key={keyword}
          placeholder="请输入SKU编号"
          mode="line"
          readOnly
          value={keyword || ""}
          onClick={gotoSearch}
          onResult={onSearchResult}
        />
      </div>
      <div className="filter203-box">
        <Filter
          key={filterKey}
          data={itemList}
          okClick={onConfirm}
          resetClick={() => setKeyword("")}
          onWatchClick={onWatchClick}
          curSelCallback={onChange}
        />
      </div>
    </div>
  );
}

export default FilterPage;
