/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */

import Consts from "../../config/consts";

const envConfig = process.env; // 环境配置
// const envStr = envConfig.REACT_ENV || "prod";

// 获取指定标签环境域名
export function getDomainFromTag(tag, path) {
  const key = tag || "api";
  let domain = "";
  switch (key) {
    case "oss":
      domain = envConfig.REACT_API_OSS;
      break;
    case "trade":
      domain = envConfig.REACT_API_TRADE;
      break;
    default:
      domain = '';
      break;
  }

  return domain + path;
}

// 请求头及参数处理
export function mergeHeaders(headers = {}) {
  return {
    token: Consts.token,
    platform: "h5",
    ...headers,
  };
}

// 请求头及参数处理
export function mergeParams(params = {}) {
  return { ...params };
}
