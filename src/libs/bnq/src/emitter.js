/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc:
 * ❗️❗️❗️如需扩展功能自行添加❗️❗️❗️
 */

import Bus from "./bus";

let isHm = window.bnq; // 是否是鸿蒙系统
let isIos = false; // 是否是ios系统
let isMobile = true; // 是否是移动端
let lastKey = "";
let lastTime = 0;
let minInterval = 100;

let hmNativeEmit = []; // 与原生通信的对象 -鸿蒙
let hmH5Port = null; // 与原生通信的端口 -鸿蒙

// 获取手机平台
function getPlatform() {
  let u = window.navigator.userAgent;
  isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
  isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // console.log({ mobile, ios })
  // return { mobile, ios };
}

export function iosDevice() {
  return isIos;
}
export function hmDevice() {
  return isHm;
}
export function mobileOS() {
  return isMobile;
}

// 处理鸿蒙消息
function handlerMsg(e) {
  if (!window.bnq) {
    return;
  }
  console.log("hm message init -----> ", e);
  if (e != null && e.data === "__hmos_port" && e.ports != null) {
    // 1. 保存从应用侧发送过来的端口。
    hmH5Port = e.ports[0];
    if (hmH5Port != null) {
      hmH5Port.onmessage = (event) => {
        // 2. 接收ets侧发送过来的消息。
        const result = event.data;
        console.log("hm message ----->", result);
        // 3. 处理消息 -移除废弃的监听
        hmNativeEmit = hmNativeEmit.filter((item) => !item.callback);
        // 4. 通知监听
        hmNativeEmit.forEach((item) => {
          if (item.key === result.key) {
            item.callback(result.data);
          }
        });
      };
    }
  }
}

// 监听鸿蒙原生消息
export function nativeHMEmit(key, callback) {
  hmNativeEmit.push({ key, callback });
}

// 移除鸿蒙监听
export function removeHMEmit(key) {
  hmNativeEmit = hmNativeEmit.filter((item) => item.key !== key);
}

/**
 * 向原生发送消息
 * @param msg: -{key: '操作事项名', params: '参数', mode: '类型'}
 */
export function postMessage(msg) {
  if (lastKey == msg.key && Date.now() - lastTime < minInterval) {
    console.warn("---> postMessage repeat add key:", lastKey);
    return;
  }
  lastTime = Date.now();
  lastKey = msg.key;
  return new Promise((resolve) => {
    function onHandler(data) {
      resolve(data);
    }
    if (msg.mode == "long") {
      delete msg.mode;
      Bus.add(msg.requestId, onHandler, 2);
    } else {
      Bus.once(msg.requestId, onHandler);
    }

    if (isMobile) {
      try {
        const isRn = window.ReactNativeWebView;
        if (isRn) {
          console.log("---> postMessage type ReactNativeWebView");
          window.ReactNativeWebView.postMessage(JSON.stringify(msg));
        } else {
          if (isIos) {
            window.postMessage(JSON.stringify(msg), "*");
          } else {
            document.postMessage(JSON.stringify(msg), "*");
          }
        }
        console.log(`---> postMessage rn:${isRn}, msg:`, msg);
      } catch (error) {
        console.warn("---> bridge postMessage error:", error);
      }
    } else {
      console.log("---> bridge init error: not a handheld device");
    }
  });
}

// 解析 Rn 端的消息
function handlerEmit(event) {
  let data = event;
  try {
    if (typeof event === "string") {
      data = JSON.parse(event);
    }
  } catch (e) {
    console.warn("---> parse catch", event, e);
  }
  if (data != null) {
    const eventKey = data.id || data.key;
    Bus.send(eventKey, data.data);
    console.log("---> handlerEmit key: ", eventKey);
  } else {
    console.log("---> handlerEmit data is null");
  }
}

// 监听原生消息
function initTools() {
  isHm = window.bnq;

  Bus.clear();
  getPlatform();

  if (isHm) {
    return;
  }

  if (isMobile) {
    window.RNBridge = { onMessage: handlerEmit };
    console.log("---> initTools message init !");
  } else {
    window.addEventListener("message", (msg) => {
      handlerEmit(msg.data);
    });
    // document.addEventListener("message", (e) => {});
    console.log("---> bridge init error: not a handheld device");
  }
}

// window.addEventListener("load", initTools); // 初始化
window.onload = initTools; // 初始化

window.removeEventListener("message", handlerMsg);
window.addEventListener("message", handlerMsg);