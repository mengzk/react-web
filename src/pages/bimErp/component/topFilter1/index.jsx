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

const ShopKey = "erp-top-filter-shop";
const CoverKey = "erp-top-filter-cover";
const OptionKey = "erp-top-filter-option";
// 顶部筛选
function TopFilter(props, ref) {
  const [shop, setShop] = useState({});
  const [cover, setCover] = useState({});
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);

  useEffect(() => {
    const data = props.data || [];
    // console.log("data--->", data);
    if (data.length > 0) {
      const res1 = data[0] || {};
      if (res1 && res1.filterList) {
        const shopList = res1.filterList[0].options || [];
        setOption1(shopList);
        const shopCache = JSON.parse(sessionStorage.getItem(ShopKey) || "{}");
        if (shopCache && shopCache.shop) {
          setShop(shopCache);
          const coverCache =
            JSON.parse(sessionStorage.getItem(CoverKey) || "{}") || {};
          setCover(coverCache);
          const optionCache =
            JSON.parse(sessionStorage.getItem(OptionKey)) || [];
          setOption2(optionCache);

          const item = shopList.find((e) => e.value == shopCache.shop[0]);
          if (item) {
            if (coverCache.cover) {
              const co3 = optionCache.filter((e) => coverCache.cover.includes(e.value));
              onResult(item, co3);
            } else {
              // onChangeShop(0, shopList);
              onResult(item, []);
            }
          }
        } else {
          if(shopList.length > 1) {
            onResult({}, []);
          }else {
            onChangeShop(0, shopList);
          }
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
    // console.log("--->", res);
    if (res) {
      if (res.shop && res.shop.length > 0) {
        setShop(res);
        const num = option1.findIndex((e) => e.value == res.shop[0]);
        onChangeShop(num, option1);
      } else if (res.cover) {
        setCover(res);
        sessionStorage.setItem(CoverKey, JSON.stringify(res));
        const item = option1.find((e) => e.value == shop.shop[0]);
        const co = (item.options || []).filter((e) =>
          res.cover.includes(e.value)
        );
        onResult(item, co);
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

    sessionStorage.setItem(ShopKey, JSON.stringify({ shop: [item.value] }));
    // 套餐套系
    const co = item.options || [];
    setOption2(co);
    sessionStorage.setItem(OptionKey, JSON.stringify(co));
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
    </div>
  );
}

export default forwardRef(TopFilter);
