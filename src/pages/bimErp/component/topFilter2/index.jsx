/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: scrollTop
 */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import moment from "moment";
import { Dropdown } from "mobilecomponet";

import "./index.less";
import filterIc from "../../../../assets/icon/filter_b.png";

const FilterKey = "erp-top-filter2";
// 顶部筛选
function TopFilter2(props, ref) {
  const [shop, setShop] = useState([]);
  const [cover, setCover] = useState([]);
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);

  useEffect(() => {
    const data = props.data || [];
    const filterJson = sessionStorage.getItem(FilterKey);
    if (filterJson) {
      const filterList = JSON.parse(filterJson);
      const shopList = filterList[0].options || [];
      setOption1(shopList);
      let index = shopList.findIndex((e) => e.select);

      // console.log("shopList--->", shopList, index);
      if (index >= 0) {
        const shopCache = shopList[index];
        setShop({ shop: [shopCache.value] });
        const coverCache = (shopCache.options || []).filter((e) => e.select);
        setCover({ cover: coverCache.map((e) => e.value) });
        const optionCache = shopCache.options || [];
        setOption2(optionCache);

        if (coverCache.length > 0) {
          onResult(shopCache, coverCache);
        } else {
          // onChangeShop(0, shopList);
          onResult(shopCache, []);
        }
      } else {
        // onChangeShop(0, shopList);
        if(shopList.length > 1) {
          onResult({}, []);
        }else {
          onChangeShop(0, shopList);
        }
      }
    } else {
      const res1 = data[1] || {};
      if (res1 && res1.filterList) {
        sessionStorage.setItem(FilterKey, JSON.stringify(res1.filterList));
        const shopList = res1.filterList[0].options || [];
        setOption1(shopList);
        // onChangeShop(0, shopList);
        if(shopList.length > 1) {
          onResult({}, []);
        }else {
          onChangeShop(0, shopList);
        }
      }
    }
  }, [props.data]);

  useImperativeHandle(ref, () => ({ getResult }), [shop, cover]);

  // 获取结果
  function getResult(tag) {
    const item = option1.find((e) => e.value == shop.shop[0]);
    const co = (item.options || []).filter((e) =>
      cover.cover.includes(e.value)
    );
    onResult(item, co);
  }

  // 下拉框选择
  function onChange(res) {
    if (res) {
      if (res.shop && res.shop.length > 0) {
        setShop(res);
        const num = option1.findIndex((e) => e.value == res.shop[0]);
        onChangeShop(num, option1);
      } else if (res.cover) {
        setCover(res);
        const item = option1.find((e) => e.value == shop.shop[0]);
        const co = (item.options || []).filter((e) =>
          res.cover.includes(e.value)
        );
        onResult(item, co);
      }
    }
  }

  function onSaveChange(item, arr2) {
    const json = sessionStorage.getItem(FilterKey);
    if (json) {
      const filterList = JSON.parse(json);
      const res1 = filterList[0] || {};
      if (res1 && res1.options) {
        let shopList = res1.options || [];
        shopList.forEach((e) => {
          const select = e.value == item.value;
          e.select = select;
          if (select) {
            e.options.forEach((o) => {
              o.select = arr2.some((v) => v.value == o.value);
            });
            filterList[1].options = e.options;
          }
        });
        sessionStorage.setItem(FilterKey, JSON.stringify(filterList));
      }
    }
  }

  // 门店选择
  function onChangeShop(num, shopList) {
    // 门店
    const item = shopList[num];
    if (!item || !item.value) {
      onResult({}, []);
      return;
    }
    setShop({ shop: [item.value] });
    // 套餐套系
    const co = item.options || [];
    setOption2(co);
    if(co.length > 1) {
      setCover({ cover: [] });
      onResult(item, []);
    }else {
      setCover({ cover: co.map((item) => item.value) });
      onResult(item, co);
    }
  }

  // 选择结果
  function onResult(item, co) {
    if (props.onChange) {
      onSaveChange(item, co);
      let items = co.map((e) => {
        return {
          shopName: item.label,
          shop: item.value,
          name: e.label,
          value: e.value,
          date: moment().format("YYYY/MM/DD HH:mm"),
        };
      });
      props.onChange(items);
    }
  }

  // 筛选
  function gotoFilter() {
    if (props.gotoFilter) {
      props.gotoFilter();
    }
  }

  return (
    <div className="v-top203-filter">
      <div className={`tab-item ${shop.shop?.length > 0 ? "active" : ""}`}>
        <Dropdown
          popupProps={{ maskClassName: "v-dd-body" }}
          value={shop}
          onChange={onChange}
          sticky
        >
          <Dropdown.Item placeholder="选择门店" name="shop" options={option1} />
        </Dropdown>
      </div>
      <div className={`tab-item ${cover.cover?.length > 0 ? "active" : ""}`}>
        <Dropdown
          popupProps={{ maskClassName: "v-dd-body" }}
          value={cover}
          onChange={onChange}
          disabled={option2.length == 0}
          card
          sticky
        >
          <Dropdown.Item
            placeholder="选择套餐套系"
            name="cover"
            multiple
            columns={2}
            options={option2}
          />
        </Dropdown>
      </div>
      <img className="filter-icon" src={filterIc} onClick={gotoFilter} />
    </div>
  );
}

export default forwardRef(TopFilter2);
