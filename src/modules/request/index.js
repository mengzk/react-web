/**
 * Author: Meng
 * Date: 2025-02-26
 * Desc: 2025-02-26
 */
import { Dialog } from "mobilecomponet";
import BnqLottie from "../../components/loading";
import { httpClient } from "./axios";
import { getDomainFromTag, mergeHeaders, mergeParams } from "./config";

// 请求入口
export async function request({
  path,
  tag = "api",
  method = "GET",
  params = {},
  headers = {},
  loading = true,
  loadingText = "加载中...",
  toast = true,
  parseResult = null,
} = {}) {
  // 显示加载中
  if (loading) {
    onShowLoading(true, loadingText);
  }
  let result = null; // 返回结果 -{code, message, data}
  // 请求参数
  const options = {
    method,
    url: getDomainFromTag(tag, path),
    data: mergeParams(params),
    headers: mergeHeaders(headers),
  };

  // 请求
  return httpClient(options)
    .then((res) => {
      if (parseResult) {
        result = parseResult(res);
      } else {
        result = onParseData(res);
      }
      return result;
    })
    .catch((err) => {
      result = onParseErr(err);
      return result;
    })
    .finally(() => {
      if (loading) {
        onShowLoading(false);
      }
      if (toast && !result.succeed) {
        onShowToast(result.message);
      }
    });
}

// 解析response数据 -
function onParseData(res) {
  let code = res.code || res.status || 1010;
  let message = res.msg || res.message || " ";
  let succeed = false;
  let data = {};

  if (res.payload != null && res.status == 1) {
    code = 200;
    succeed = true;
    message = "ok";
    data = res.payload;
  } else if (res.code == 0 || res.code == "0") {
    code = 200;
    succeed = true;
    message = "ok";
    data = res.data;
  } else {
    // 解析特殊错误信息
    const resMsg = res.msg || res.message || "";
    if (resMsg && resMsg.includes("resJson=")) {
      const str = resMsg.split("resJson=")[1];
      try {
        const dataJson = JSON.parse(str);
        if (dataJson.data) {
          const resp = dataJson.data.response || {};
          code = resp.code || -1011;
          message = resp.message || resp.msg || "未知错误";
        }
      } catch (err3) {
        code = -1012;
        message = "服务日志数据解析失败";
        console.log("JSON解析失败", err3);
      }
    }
  }
  return { code, message, data, succeed };
}

// 解析错误信息 -
function onParseErr(res) {
  console.log("---> err", res);
  let code = res.code || -1013;
  let message = res.message || "未知错误";

  return { code, message, data: null, succeed: false };
}

// 显示toast
function onShowToast(content) {
  if (content) {
    // Dialog.close();
    Dialog.show({
      content,
      hasCancel: false,
      ok: "我知道了",
      actionType: "line",
    });
  }
}

// 显示加载中
function onShowLoading(loading, msg) {
  if (loading) {
    BnqLottie.onShow(msg);
  } else {
    BnqLottie.onHide();
  }
}
