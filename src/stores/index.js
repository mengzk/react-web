/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 数据存储
 * 
 */

import LocalStorage from "./local";

const storage = new LocalStorage();

// 存储
export function setUserInfo(data) {
  storage.setUserInfo(data);
}
// 获取
export function getUserInfo() {
  return storage.getUserInfo();
}

// 存储
export function setStorage(key, data) {
  storage.setStorage(key, data);
}
// 获取
export function getStorage(key) {
  return storage.getStorage(key);
}
// 移除
export function removeStorage(key) {
  storage.removeStorage(key);
}
// 清空
export function clearStorage() {
  storage.clearStorage();
}
