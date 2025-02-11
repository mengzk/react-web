/**
 * Author: Meng
 * Date: 2023-06-09
 * Desc: 2023-06-09
 */

import { httpClient } from "./axios";
import { getDomainFromTag, mergeHeaders, mergeParams } from "./config";

// 请求入口
export function request({
  url,
  tag = "api",
  method = "GET",
  params = {},
  headers = {},
  loading = true,
  loadingText = "加载中...",
  toast = true,
  // parseData = parseData,
} = {}) {
  // 显示加载中
  if (loading) {
    onShowLoading(true, loadingText);
  }

  let result = null;
  const options = {
    method,
    url: getDomainFromTag(tag) + url,
    data: mergeParams(params),
    headers: mergeHeaders(headers),
  };

  return httpClient(options)
    .then((res) => {
      result = res;
      return result;
    })
    .catch((err) => {
      result = parseError(err);
      return result;
    })
    .finally(() => {
      if (loading) {
        onShowLoading(false);
      }
      if (toast && result.code != 0) {
        onShowToast(result.message);
      }
    });
}

// 解析response数据 -
function parseData(res) {
  console.log(res);
  let code = res.code || 1010;
  let message = res.message || "ok";
  let data = res.data;

  return { code, data, message };
}

// 解析错误信息 -
function parseError(res) {
  let code = res.code,
    message = "";

  return { code, message, data: null };
}

// 显示toast
function onShowToast(msg) {
  // console.log(msg)
  if (msg) {
  }
}

// 显示加载中
function onShowLoading(loading, msg) {
  // console.log(loading, text);
}
