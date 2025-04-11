/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */
import React, { lazy } from "react";

const routes = [
  {
    path: "bimerp",
    children: [
      {
        index: true,
        component: lazy(() => import("./index/index")),
        meta: { title: "业务资料" },
      },
      {
        path: "result",
        component: lazy(() => import("./result/index")),
        meta: { title: "搜索结果" },
      },
      {
        path: "filter",
        component: lazy(() => import("./filter/index")),
        meta: { title: "商品清单筛选" },
      },
      {
        path: "report",
        component: lazy(() => import("./report/index")),
        meta: { title: "谈单手册" },
      },
    ],
  },
  // {
  //   Component: lazy(() => import("./list/index")),
  //   path: "/list",
  //   title: "实例",
  // }
];

export default routes;
