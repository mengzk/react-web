/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc: 下单审核/审价模块路由
 */
import React, { lazy } from "react";

const routes = [
  {
    path: "auditPrice",
    children: [
      {
        path: "create",
        component: lazy(() => import("./create/index")),
        meta: { title: "下单审核" },
      },
      {
        path: "apply",
        component: lazy(() => import("./apply/index")),
        meta: { title: "下单审核" },
      },
      {
        path: "approval",
        component: lazy(() => import("./approval/index")),
        meta: { title: "审价填写" },
      },
      {
        path: "linkSO",
        component: lazy(() => import("./linkSO/index")),
        meta: { title: "关联SO单" },
      },
      {
        path: "soList",
        component: lazy(() => import("./soList/index")),
        meta: { title: "编辑已收明细" },
      },
      {
        path: "remain",
        component: lazy(() => import("./remain/index")),
        meta: { title: "遗留单" },
      },
      {
        path: "remainAdd",
        component: lazy(() => import("./remainAdd/index")),
        meta: { title: "创建遗留单" },
      },
    ],
  },
];

export default routes;
