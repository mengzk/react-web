/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 模块页面目录
 */

import React from "react";

export const ProductPage = React.lazy(() => import("./index/index"));
export const ProductDetailPage = React.lazy(() => import("./detail/detail"));
