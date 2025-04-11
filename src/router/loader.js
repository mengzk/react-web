/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */
import React from "react";
import { redirect } from "react-router";

import ErrorPage from "../pages/warn/ErrorPage";
import LazyPage from "../components/lazy";

// 路由加载器
export function routeLoader({ request, params }, title) {
  const path = window.location.href;
  if(path != request.url) {
    console.log(`---> route form: ${path}, to: ${request.url}`);
  }
  document.title = title || "App";
  return request == null ? redirect("/404") : { back: false };
}

// 转换路由
export function transformRoute(route) {
  // console.log("---> route", route);
  const children = route.children || [];
  if (children.length > 0) {
    route.children = children.map(transformRoute);
    return route;
  } else {
    // 标题
    const title = route.meta ? route.meta.title : (route.title || "App");

    const item = {
      path: route.path,
      index: route.index || false,
      errorElement: <ErrorPage />,
      loader: (res) => routeLoader(res, title),
    }
    // 判断是否是组件
    if(route.element) {
      item.element = route.element;
    }else if(route.component) {
      item.element = <LazyPage lazy={route.component} />;
    }
    return item;
  }
}