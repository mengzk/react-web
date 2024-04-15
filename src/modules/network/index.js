/**
 * Author: Meng
 * Date: 2023-
 * Desc:
 */

import axios from "axios";
import { NoRequest } from "request-no";
import AppConfig from "../../config/index";
import { interceptor, getRequestHost } from "./config";

// const { defEnv, defHost } = AppConfig; // 全局配置
const axiosIns = axios.create({ timeout: 20000 }); // 初始化 axios 实例

// 配置 axios请求
function network(options) {
  if (AppConfig.printLog) {
    // 可以使用 axios 的拦截器打印
    console.log(`------> request: method=${options.method}, url=${options.url}, params:`, options.params);
    console.log('------> headers: ', options.headers);
  }

  if (options.method == 'POST') {
    options.data = options.params;
    delete options.params;
  }

  return new Promise((resolve, reject) => {
    axiosIns.request(options)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// 解析response数据 -
function parseData(res, url) {
  let code = res.status;
  let message = res.statusText || 'ok';
  let headers = {}; // res.headers;
  let method = "POST";
  let data = res.data || {};

  if (code == 200) {
    code = data.code;
    message = data.message || data.data;
    data = data.data;
  }
  if (AppConfig.printLog) {
    const reqInfo = res?.request || {};
    // const url = reqInfo.responseURL;
    const param = reqInfo.__sentry_xhr__?.body || {};
    const json = res.data || res;
    headers = reqInfo._headers || {};
    method = reqInfo.__sentry_xhr__?.method || 'GET';
    console.log('------> url: ', url);
    console.log('------> response: ', JSON.stringify(json));
  }

  return { code, data, message: "", headers };
}

// 解析错误信息 -
function parseError(res, url) {
  let code = res.code, message = '', status = -1;
  const reqInfo = res.request || {};

  if (AppConfig.printLog) {
    // url = reqInfo.responseURL || reqInfo._url;
    const param = reqInfo.__sentry_xhr__?.body || {};
    const header = reqInfo._headers || {};
    header.method = reqInfo.__sentry_xhr__?.method || 'GET';

    console.log(`------> error url: ${url}, status: ${reqInfo.status}, code: ${code}`);
    console.log('------> error info:', reqInfo || res);
  }

  if (reqInfo) {
    code = (code || '').toLowerCase();
    status = reqInfo.status;
    // url = reqInfo.responseURL || reqInfo._url;
    switch (status) {
      case 0:
        status = -1;
        message = `${code == 'econnaborted' ? '请求超时' : '网络异常'}，请重新连接`;
        break;
      case 403:
        message = '请求地址不能访问'
        break;
      case 404:
        message = '请求地址不存在'
        break;
      case 405:
        message = '请求方式错误，请联系开发人员'
        break;
      case 500:
      case 502:
        message = '服务重启中, 请稍后'
        break;
      case 504:
        message = '网关连接超时, 请稍后'
        break;
      default:
        message = `抱歉, 请求失败:${status}`
        break;
    }
  }
  return { code: status, message };
}

// 显示toast
function showToast(msg) {
  // console.log(msg)
  if (msg) {
  }
}

// 显示加载中
function showCustomLoading(loading, msg) {
  // console.log(loading, text);
}

// network：可配置 fetch或axios
const instance = new NoRequest({
  network,
  parseData,
  parseError,
  interceptor,
  // def_host,
  // def_env,
  getRequestHost,
  showCustomLoading,
  showToast,
});

// 请求入口
export function request(options) {
  return instance.request(options);
}
