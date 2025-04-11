/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 路由管理
 *    Component: 页面组件         HomePage
 *    element: 页面元素           <HomePage />
 *    errorElement: 错误页面元素   <ErrorPage />
 *    loader: 页面加载器
 */
import React from "react";
import { createBrowserRouter, createHashRouter } from "react-router";

import { routeLoader, transformRoute } from "./loader";

import HomePage from "../pages/common/home/index";
import SearchPage from "../pages/common/search";
// import TestPage from "../pages/warn/Test";
import ErrorPage from "../pages/warn/ErrorPage";
import NotFound from "../pages/warn/NotFound";
// import Layout from "../components/layout";

// 业务(资料) -路由
import bimErpRouter from "../pages/bimErp/router";
import auditPriceRouter from "../pages/auditPrice/router";

// 路由列表
let routerList = [
  {
    path: "/",
    // element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: (res) => routeLoader(res, "首页"),
      },
    ],
  },
  ...bimErpRouter.map(transformRoute),
  ...auditPriceRouter.map(transformRoute),
  // {
  //   path: "test",
  //   element: <TestPage />,
  //   loader: (res) => routeLoader(res, "测试"),
  // },
  {
    path: "search",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    loader: (res) => routeLoader(res, "搜索"),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

console.log("---> routerList", routerList);

const isDev = process.env.NODE_ENV != "production";
// 创建路由
const routes = isDev ? createBrowserRouter(routerList) : createHashRouter(routerList);

// 导航
export function navigate(path, params) {
  routes.navigate(path, params);
}

export default routes;
