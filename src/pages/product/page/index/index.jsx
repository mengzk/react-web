/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useRef, useState, useEffect } from "react";

import "./index.css";
import { navigate } from "../../../routes";
import { GoodsItem } from "../../component/index";

function ProductPage(props) {
  useEffect(() => {}, []);

  return (
    <div className="product">
      <div className="product-topbar"></div>

      <h1>产品具体列表 上面 一行tab 搜索 下面商品宫格</h1>
      <div className="product-products">
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
        <GoodsItem />
      </div>
    </div>
  );
}

export default ProductPage;
