/**
 * Author: Meng
 * Date: 2023-09-01
 * Modify: 2023-09-01
 * Desc: 系统API封装
 */

export function systemInit() {
  deviceInfo();
}

// 获取设备信息
function deviceInfo() {
  const u = navigator.userAgent;
  const info = {
    //浏览器版本信息
    trident: u.indexOf("Trident") > -1,
    presto: u.indexOf("Presto") > -1,
    webKit: u.indexOf("AppleWebKit") > -1,
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") > -1,
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
    iPhone: u.indexOf("iPhone") > -1,
    iPad: u.indexOf("iPad") > -1,
    webApp: u.indexOf("Safari") > -1,
    weixin:
      (u.indexOf("MicroMessenger") > -1 &&
        u
          .replace(/.*(MicroMessenger\/[^\s]*).*/, "$1")
          .replace("MicroMessenger/", "")) ||
      false,
    appVersion:
      u.indexOf("yourapp(") > -1
        ? u.match(/yourapp\(\S+\)/)[0].slice(7, -1)
        : "3.0.0",
  };
  console.log(info);
}

export {};
