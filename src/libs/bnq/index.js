/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 调用原生Api
 */

import ToolsV1 from "./src/tools1";
import ToolsV2 from "./src/tools2";
import HMApi from "./src/hmApi";

// 通过版本号判断调用的方法
export function bridgeTools(key, data = {}, callback, version=2) {
  const vers = version;

  switch (vers) {
    case 1:
      bridgeInvokeV1(key, data, callback);
      break;
    case 2:
      bridgeInvokeV2(key, data, callback);
      break;
    default:
      bnqBridge(key, data, callback);
      break;
  }
}

// 鸿蒙调用
export function bnqBridge(key, data = {}) {
  return HMApi.invoke(key, data);
}

// 版本1调用
function bridgeInvokeV1(key, data, callback) {
  const methodList = Object.getOwnPropertyNames(ToolsV1)
  .filter(prop => typeof ToolsV1[prop] === 'function');
  const hasMethod = methodList.includes(key);
  try {
    if(hasMethod) {
      ToolsV1[key](data, callback);
    }else {
      ToolsV1.sendMessage(key, data, callback);
    }
  } catch (error) {
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}

// 版本2调用
function bridgeInvokeV2(key, data, callback) {
  const methodList = Object.getOwnPropertyNames(ToolsV2)
  .filter(prop => typeof ToolsV2[prop] === 'function');
  const hasMethod = methodList.includes(key);
  if (true) {
    ToolsV2.sendMsgToRN(key, data, callback);
  } else {
    console.warn(`ToolsV2 method`, methodList);
    console.warn(`App不支持 ${key} 方法, 请联系开发人员`);
  }
}
