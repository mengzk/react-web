/**
 * Author: Meng
 * Date: 2023-09-06
 * Modify: 2023-09-06
 * Desc: 数据存储
 *
 */

export default class LocalStorage {

  getUserInfo() {
    const data = window.localStorage.getItem('app-user-info');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  setUserInfo(data) {
    window.localStorage.setItem('app-user-info', JSON.stringify(data));
    window.dispatchEvent(new Event("login-storage"));
  }

  // 获取存储数据
  getStorage(key) {
    const data = window.localStorage.getItem(key);
    if (data && data.indexOf("{") == 0 && data.lastIndexOf("}") == (data.length - 1)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }
  // 存储数据
  setStorage(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    window.dispatchEvent(new Event("storage"));
  }

  // 获取存储数据 -异步
  getAsyncStorage(key) {
    const data = window.localStorage.getItem(key);
    if (data && data.indexOf("{") == 0 && data.lastIndexOf("}") == (data.length - 1)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }
  // 存储数据 -异步
  setAsyncStorage(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    window.dispatchEvent(new Event("storage"));
  }
  // 移除指定的数据
  removeStorage(key) {
    window.localStorage.removeItem(key);
  }
  // 清空存储
  clearStorage() {
    window.localStorage.clear();
  }
}
