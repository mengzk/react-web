/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 调用原生Api
 */

import Tools from "./src/tools";
import RNTool from "./src/tools1";
import rnToolV2 from "./src/tools2";
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
    rnToolV2.emit(key, data);
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
        rnToolV2.push("QRCodePage", data, callback);
        break;
      case "emit":
        rnToolV2.emit(key, data);
        break;
      default:
        rnToolV2.sendMsgToRN(key, data, callback);
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
  const methodList = Object.getOwnPropertyNames(RNTool).filter(
    (prop) => typeof RNTool[prop] === "function"
  );
  const hasMethod = methodList.includes(key);
  try {
    if (hasMethod) {
      RNTool[key](data, callback);
    } else {
      RNTool.sendMessage(key, data, callback);
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
        rnToolV2.push("QRCodePage", data, callback);
        break;
      default:
        rnToolV2.sendMsgToRN(key, data, callback);
        break;
    }
  } catch (error) {
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}

// 导出
export { RNTool, rnToolV2 };
