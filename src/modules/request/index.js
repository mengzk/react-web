/**
 * Author: Meng
 * Date: 2023-06-09
 * Desc: 2023-06-09
 */

import { network, requestUrl, mergeHeaders, mergeParams } from "./config";

// 请求入口
export function request({
  url,
  method = "GET",
  params = {},
  headers = {},
  loading = true,
  loadingText = "加载中...",
  toast = true,
  count = 0,
  maxCount = 3,
} = {}) {
  return new Promise((resolve) => {
    const options = {
      method,
      url: requestUrl(host, url),
      params: mergeParams(params),
      headers: mergeHeaders(headers),
    };
    // 显示加载中
    if (loading) {
      onShowLoading(true, loadingText);
    }
    let result = null;

    function onResult(result, resolve) {
      if (loading) {
        onShowLoading(false);
      }
      if (toast && result.code != 0) {
        onShowToast(result.msg);
      }
      resolve(result);
    }

    network(options)
      .then((res) => {
        result = parseData(res, url);
        // resolve(res);
      })
      .catch((err) => {
        result = parseError(err, url);
        // resolve({ code, msg });
      })
      .finally(() => {
        if (result.code != 0) {
          if (count < maxCount) {
            request({
              url,
              method,
              params,
              headers,
              loading,
              loadingText,
              toast,
              count: count + 1,
              maxCount,
            });
            return;
          } else {
            onResult(result, resolve);
          }
        } else {
          onResult(result, resolve);
        }
      });
  });
}

// 解析response数据 -
function parseData(res, url) {
  let code = res.status;
  let msg = res.statusText || "ok";
  let headers = {}; // res.headers;
  let data = res.data || {};

  if (code == 200) {
    code = data.code;
    msg = data.msg || data.data;
    data = data.data;
  }

  return { code, data, msg: "", headers };
}

// 解析错误信息 -
function parseError(res, url) {
  let code = res.code,
    msg = "",
    status = -1;
  const reqInfo = res.request || {};

  if (reqInfo) {
    code = (code || "").toLowerCase();
    status = reqInfo.status;
    // url = reqInfo.responseURL || reqInfo._url;
    switch (status) {
      case 0:
        status = -1;
        msg = `${code == "econnaborted" ? "请求超时" : "网络异常"}，请重新连接`;
        break;
      case 403:
        msg = "请求地址不能访问";
        break;
      case 404:
        msg = "请求地址不存在";
        break;
      case 405:
        msg = "请求方式错误，请联系开发人员";
        break;
      case 500:
      case 502:
        msg = "服务重启中, 请稍后";
        break;
      case 504:
        msg = "网关连接超时, 请稍后";
        break;
      default:
        msg = `抱歉, 请求失败:${status}`;
        break;
    }
  }
  return { code: status, msg };
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
