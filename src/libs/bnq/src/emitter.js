/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc:
 * ❗️❗️❗️如需扩展功能自行添加❗️❗️❗️
 */

import Bus from "./bus";

let isIos = false;
let isMobile = true;
let lastKey = "";
let lastTime = 0;
let minInterval = 100;

// 获取手机平台
function getPlatform() {
  let u = window.navigator.userAgent;
  isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
  isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // console.log({ mobile, ios })
  // return { mobile, ios };
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
          console.log('---> postMessage type ReactNativeWebView');
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
    if(typeof event === 'string'){
      data = JSON.parse(event);
    }
  } catch (e) {
    console.warn("---> parse catch", event, e);
  }
  if (data != null) {
    const eventKey = data.id || data.key;
    Bus.send(eventKey, data.data);
    console.log("---> handlerEmit key: ", eventKey);
  }else {
    console.log("---> handlerEmit data is null");
  }
}

// 监听原生消息
function initTools() {
  Bus.clear();
  getPlatform();

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

window.onload = initTools; // 初始化
