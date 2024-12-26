/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc:
 */

import AppConfig from "../../config/index";

// 环境及服务器设置
export const env_hosts = {
  prod: {
    api: "http://api.demo.com",
    order: "http://order.demo.com",
    wx: "ws://iat-api.xfyun.cn/v2/iat",
  },
  dev: {
    api: "http://192.168.253.154:8063",
    order: "http://order.localhost:8087",
    ws: "ws://iat-api.xfyun.cn/v2/iat",
  },
};

// 获取网络host
export function requestUrl(tag, path) {
  return getHostFromTag(tag) + path;
}

// 获取指定标签环境域名
export function getHostFromTag(tag, env) {
  const envTag = env || AppConfig.defEnv;
  const domain = tag || "api";
  return env_hosts[envTag][domain];
}

// 请求头及参数处理
export function mergeHeaders(headers = {}) {
  return {
    authentication: "applicatio",
    secret: "",
    token: "",
    "Content-Type": "application/json",
    ...headers,
  };
}

// 请求头及参数处理
export function mergeParams(params = {}) {
  params.token = "";
  return params;
}

// 配置
export function network(options) {
  if (options.method == "POST") {
    options.body = JSON.stringify(options.params);
    delete options.params;
  }

  return fetch(options.url, {
    ...options,
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json());
}
