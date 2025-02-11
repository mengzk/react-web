/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 路由管理
 */
import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

import MainPage from "../pages/main";

import Workbench from "./workbench/index";
import DetailPage from "./workbench/detail";

import LoginPage from "./login";
import AccountInfo from "./login/info";
import Customer from "./customer/index";
import CustomerInfo from "./customer/info";
import Device from "./device/index";
import DeviceDetail from "./device/detail";
import Model from "./model/index";
import ModelDetail from "./model/detail";
import Cost from "./cost/index";
import CostDetail from "./cost/detail";
import Report from "./report/index";
import ReportDetail from "./report/detail";

import ErrorPage from "./warn/ErrorPage";
import FallbackPage from "./warn/Fallback";
import TestPage from "./warn/Test";
// const ErrorPage = React.lazy(() => import("./warn/ErrorPage"));

const routeStack = [];

window.addEventListener("popstate", (e) => {
  console.log("---> popstate", e.isTrusted);
  if (!e.isTrusted) {
    routeStack.pop();
  }
});

// 路由加载器
function routeLoader({ request, params }, title) {
  const path = window.location.href;
  console.log(`route form: ${path}, to: ${request.url}, params: ${params}`);
  routeStack.push({ path: request.url });
  document.title = title || "App";
  return request == null ? redirect("account/login") : { back: false };
}

// 懒加载
function lazyPage(element, path, title, index = false) {
  return {
    path,
    index,
    loader: (res) => routeLoader(res, title),
    errorElement: <ErrorPage />,
    element: (
      <React.Suspense fallback={<FallbackPage />}>{element}</React.Suspense>
    ),
  };
}

// 路由
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // errorElement: <ErrorPage />,
    children: [
      lazyPage(<Workbench />, "", "工作台", true),
      lazyPage(<DetailPage />, "detail", "详情"),
      {
        path: "report",
        mate: { title: "报表" },
        children: [
          lazyPage(<Report />, "", "登录", true),
          lazyPage(<ReportDetail />, "detail", "详情"),
        ],
      },
      {
        path: "device",
        mate: { title: "设备" },
        children: [
          lazyPage(<Device />, "", "登录", true),
          lazyPage(<DeviceDetail />, "detail", "详情"),
        ],
      },
      {
        path: "cost",
        mate: { title: "费用" },
        children: [
          lazyPage(<Cost />, "", "登录", true),
          lazyPage(<CostDetail />, "detail", "详情"),
        ],
      },
      {
        path: "customer",
        mate: { title: "用户" },
        children: [
          lazyPage(<Customer />, "", "登录", true),
          lazyPage(<CustomerInfo />, "info", "详情"),
        ],
      },
      {
        path: "model",
        mate: { title: "模型" },
        children: [
          lazyPage(<Model />, "", "登录", true),
          lazyPage(<ModelDetail />, "detail", "详情"),
        ],
      },
    ],
  },
  {
    path: "/login",
    children: [
      lazyPage(<LoginPage />, "", "登录", true),
      lazyPage(<AccountInfo />, "info", "账号信息"),
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
    children: []
  },
  {
    path: "*",
    async lazy() {
      let { NotFoundPage } = await import("./warn/NotFound");
      return { Component: NotFoundPage };
    },
  },
]);

export function navigate(path, params) {
  routes.navigate(path, params);
}

export default routes;
