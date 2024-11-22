/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 调用原生Api
 */

import Tools from "./src/tools";
import ToolsV1 from "./src/tools1";
import ToolsV2 from "./src/tools2";
import HMApi from "./src/hmApi";
import { hmDevice } from "./src/emitter";
import { methodMap } from "./src/rnToHm";

// 通过版本号判断调用的方法
function bnqBridge(key, data = {}, callback, version = 2) {
  if (hmDevice()) {
    let event = methodMap[key];
    if (!event) {
      event = key;
    }
    return _hmBridge(event, data, callback);
  } else {
    const vers = version || 2;
    switch (vers) {
      case 1:
        _bridgeInvokeV1(key, data, callback);
        break;
      default:
        _bridgeInvokeV2(key, data, callback);
        break;
    }
  }
}

// 发送消息
function bnqEmitter(key, data = {}) {
  if (hmDevice()) {
    // const time = Date.now();
    Tools.emit({ key: "h5EmitToRN", event: key, data });
  } else {
    ToolsV2.emit(key, data);
  }
}

// 兼容调用rn-hm
function compatInvoke(key = "", data, callback) {
  if (hmDevice()) {
    switch (key) {
      case "setTitle":
        Tools.headerConfig({ title: data });
        break;
      default:
        Tools.invoke(key, data, callback);
        break;
    }
  } else {
    switch (key) {
      case "QRCodePage":
        ToolsV2.push("QRCodePage", data, callback);
        break;
      case "emit":
        ToolsV2.emit(key, data);
        break;
      default:
        ToolsV2.sendMsgToRN(key, data, callback);
        break;
    }
  }
}

/** -----------===------------ */

// 鸿蒙调用
function _hmBridge(key, data, callback) {
  return Tools.invoke(key, data, callback);
}

// 版本1调用
function _bridgeInvokeV1(key, data, callback) {
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
function _bridgeInvokeV2(key, data, callback) {
  try {
    switch (key) {
      case "QRCodePage":
        ToolsV2.push("QRCodePage", data, callback);
        break;
      default:
        ToolsV2.sendMsgToRN(key, data, callback);
        break;
    }
  } catch (error) {
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}

const rnToolV2 = ToolsV2; // 版本2工具
// 导出
export { HMApi, rnToolV2, bnqBridge, bnqEmitter, compatInvoke };
