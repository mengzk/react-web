/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 系统工具
 */
import Constants from "../config/consts";

export function initDevice() {
  deviceInfo();
}

/**
 * 获取设备信息
 */
function deviceInfo() {
  const u = navigator.userAgent || {};
  // const info = {
  //   //浏览器版本信息
  //   trident: u.indexOf("Trident") > -1,
  //   presto: u.indexOf("Presto") > -1,
  //   webKit: u.indexOf("AppleWebKit") > -1,
  //   gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") > -1,
  //   mobile: !!u.match(/AppleWebKit.*Mobile.*/),
  //   ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  //   android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
  //   iPhone: u.indexOf("iPhone") > -1,
  //   iPad: u.indexOf("iPad") > -1,
  //   webApp: u.indexOf("Safari") > -1,
  //   weixin:
  //     (u.indexOf("MicroMessenger") > -1 &&
  //       u
  //         .replace(/.*(MicroMessenger\/[^\s]*).*/, "$1")
  //         .replace("MicroMessenger/", "")) ||
  //     false,
  //   appVersion:
  //     u.indexOf("baianjuapp(") > -1
  //       ? u.match(/baianjuapp\(\S+\)/)[0].slice(7, -1)
  //       : "3.0.0",
  // };
  const iosD = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const androidD = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;

  Constants.isIOS = iosD;
  Constants.inApp = iosD || androidD;
  Constants.inBnq = u.indexOf("baianjuapp") >= 0;
  Constants.platform = iosD ? "ios" : androidD ? "android" : "web";
  // console.log(info);
}

/**
 * 获取系统信息
 */
export function platformName() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  if (isAndroid) {
    return "android";
  } else if (isIOS) {
    return "ios";
  } else {
    return "web";
  }
}

/**
 * 是否在app内
 */
export function isInApp() {
  if (!window) {
    return false;
  }
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("baianjuapp") >= 0;
}

/**
 * 是否是IOS
 */
export function isIOSDevice() {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 判断是否在浏览器中运行
 * @returns {boolean} true 表示在浏览器中运行
 */
export function isInBrowser() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.indexOf("chrome") > -1 ||
    ua.indexOf("safari") > -1 ||
    ua.indexOf("firefox") > -1 ||
    ua.indexOf("edge") > -1 ||
    ua.indexOf("opera") > -1
  );
}

/**
 * 判断是否在浏览器的模拟器中运行
 * @returns {boolean} true 表示在浏览器的模拟器中运行
 */
export function isInBrowserEmulator() {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|ipod/.test(ua);
  const isDesktop = !isMobile;

  // 如果检测到是移动设备，但屏幕尺寸接近桌面设备，可能是模拟器
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // 假设宽度大于 1024 且 userAgent 包含移动设备关键字，则可能是模拟器
  if (isMobile && (screenWidth > 1024 || screenHeight > 1024)) {
    return true;
  }
  return false;
}

/**
 * 判断是否在浏览器的模拟器中运行
 * @returns {boolean} true 表示在浏览器的模拟器中运行
 */
export function isInEmulator() {
  const isTouchSupported =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobile = /mobile|android|iphone|ipad|ipod/.test(
    navigator.userAgent.toLowerCase()
  );
  // 如果 userAgent 表示是移动设备，但不支持触摸事件，则可能是模拟器
  return isMobile && !isTouchSupported;
}

/**
 * 是否在微信内
 */
export function isWeixin() {
  const u = navigator.userAgent;
  return u.indexOf("MicroMessenger") > -1;
}

// 获取系统信息
export function updateHrefParams(params) {
  const url = window.location.href;
  const urlObj = new URL(url);
  for (const key in params) {
    urlObj.searchParams.set(key, params[key]);
  }
  window.history.replaceState(null, "", urlObj.href);
  // history.replaceState(null, "", window.location.href.split("?")[0]);
}
