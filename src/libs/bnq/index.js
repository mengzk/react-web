/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 调用原生Api
 */

import ToolsV1 from "./src/tools1";
import ToolsV2 from "./src/tools2";
import HMApi from "./src/hmApi";
import { methodMap } from "./src/rnToHm";

// 通过版本号判断调用的方法
function bnqBridge(key, data = {}, callback, version = 2) {
  if (window.bnq) {
    let event = methodMap[key];
    if (!event) {
      event = key;
    }
    return hmBridge(event, data);
  } else {
    const vers = version || 2;

    switch (vers) {
      case 1:
        bridgeInvokeV1(key, data, callback);
        break;
      default:
        bridgeInvokeV2(key, data, callback);
        break;
    }
  }
}

// 发送消息
function bnqEmitter({key='', data = {}, event='', version = 2, callback}={}) {
  if (window.bnq) {
    const time = Date.now();
    return HMApi.emit({time, key, event, data });
  } else {
    const vers = version || 2;
    switch (vers) {
      case 1:
        ToolsV1.sendMessage(key, data, callback);
        break;
      default:
        ToolsV2.emit(key, data);
        break;
    }
  }
}

// 发送消息
function invokeMathod(key='', data = {}, callback) {
  if (window.bnq) {
    return HMApi.invoke(key, data);
  } else {
    ToolsV2.sendMsgToRN(key, data, callback);
  }
}

/** -----------===------------ */

// 鸿蒙调用
function hmBridge(key, data) {
  return HMApi.invoke(key, data);
}

// 版本1调用
function bridgeInvokeV1(key, data, callback) {
  const methodList = Object.getOwnPropertyNames(ToolsV1).filter(
    (prop) => typeof ToolsV1[prop] === "function"
  );
  const hasMethod = methodList.includes(key);
  try {
    if (hasMethod) {
      ToolsV1[key](data, callback);
    } else {
      ToolsV1.sendMessage(key, data, callback);
    }
  } catch (error) {
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}

// 版本2调用
function bridgeInvokeV2(key, data, callback) {
  try {
    ToolsV2.sendMsgToRN(key, data, callback);
  } catch (error) {
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}

// 导出
export { HMApi, bnqBridge, bnqEmitter, invokeMathod };
