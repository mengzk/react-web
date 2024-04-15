/**
 * Author: Meng
 * Date: 2023-08-18
 * Modify: 2023-08-18
 * Desc:
 */

import AppConfig from "../../config/index";

// 环境及服务器设置
export const env_hosts = {
  prod: {
    def: "http://def.demo.com",
    order: "http://order.demo.com",
    wx: "ws://iat-api.xfyun.cn/v2/iat",
  },
  test: {
    def: "http://def-test.demo.com",
    order: "http://order-test.demo.com",
    ws: "ws://iat-api.xfyun.cn/v2/iat",
  },
  dev: {
    def: "http://192.168.253.109:8087",
    order: "http://order.localhost:8087",
    ws: "ws://iat-api.xfyun.cn/v2/iat",
  },
};

// 获取网络host
export function getRequestHost(host, env) {
  console.log(host, env)
  return getHostFromTag(host || AppConfig.defHost, env || AppConfig.defEnv);
}

// 获取指定标签环境域名
export function getHostFromTag(tag, env) {
  const envTag = env || "prod";
  const domain = tag || "def";
  return env_hosts[envTag][domain];
}

// 请求头及参数处理
export function interceptor(params, headers) {
  let token = "9AZMBYfKQdyaJzQ";
  let agent = "123agent45678";
  // params.agent = agent;
  headers.appAgent = agent;
  headers.token = token;
  return { params, headers };
}
