/**
 * Author: Meng
 * Date: 2025-03-03
 * Modify: 2025-03-03
 * Desc: 非登录态启动项配置初始化
 */
import VConsole from "vconsole";
import { rnToolV2 } from "web-message-for-rn";

import { initDevice, isInApp, isInEmulator } from "./device";

const isApp = isInApp();

let VCInstance = null;
// 非登录态初始化
export function initConfig() {
  // sessionStorage.clear(); // 清除缓存
  initDevice();
  consoleInit();
}

function consoleInit() {
  if (!isApp) {
    const plat = isInEmulator();
    if(plat) {
      VCInstance = new VConsole();
    }
  } else {
    if (process.env.NODE_ENV != "production") {
      VCInstance = new VConsole();
      rnToolV2.sendMsgToRN("isDeveloperMode", {}, (res) => {
        if (!res.isDeveloperMode && VCInstance) {
          VCInstance.destroy();
        }
      });
    } else {
      rnToolV2.sendMsgToRN("isDeveloperMode", {}, (res) => {
        if (res.isDeveloperMode) {
          VCInstance = new VConsole();
        } else if (VCInstance) {
          VCInstance.destroy();
        }
      });
    }
  }
}
