/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc:
 */

import Configs from "../../config/index";
import Consts from "../../config/consts";

// 环境及服务器设置
const appDomains = {
  prod: {
    api: "http://aimlai.com",
    order: "http://order.demo.com",
  },
  dev: {
    api: "/api",
    order: "",
  },
};

// 获取指定标签环境域名
export function getDomainFromTag(tag) {
  const key = tag || "api";
  return appDomains[Configs.env][key];
}

// 请求头及参数处理
export function mergeHeaders(headers = {}) {
  return {
    Authorization: Consts.token,
    ...headers,
  };
}

// 请求头及参数处理
export function mergeParams(params = {}) {
  return params;
}

// 配置
export function network(options) {
  if (options.method == "POST") {
    options.body = JSON.stringify(options.data);
    delete options.data;
  }

  return fetch(options.url, {
    ...options,
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json());
}
