/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 路由管理
 */
import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

import MainPage from "./main";
import { HomePage } from "./home/page/index";
import { ProductPage, ProductDetailPage } from "./product/page/index";
import ErrorPage from "./warn/ErrorPage";
import FallbackPage from "./warn/Fallback";
// const ErrorPage = React.lazy(() => import("./warn/ErrorPage"));

const routeStack = [];

window.addEventListener('popstate', (e) => {
  console.log('popstate---> ', e.isTrusted);
  if(!e.isTrusted) {
    routeStack.pop();
  }
});

// 路由加载器
function routeLoader({ request, params }, title) {
  const path = window.location.href;
  console.log(`route form: ${path}, to: ${request.url}, params: ${params}`);
  routeStack.push({path: request.url});
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
      lazyPage(<HomePage />, "", "首页", true)
    ],
  },
  {
    path: "product",
    // element: <ProductPage />,
    // errorElement: <ErrorPage />,
    children: [
      lazyPage(<ProductPage />, "", "商品列表", true),
      lazyPage(<ProductDetailPage />, "detail", "商品详情"),
    ],
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
