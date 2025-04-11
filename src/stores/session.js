/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 数据存储
 *
 */

export default class Session {
  // 获取存储数据
  static getData(key) {
    const data = window.sessionStorage.getItem(key);
    if (data === null) {
      return null;
    } else {
      const size = data.length - 1;
      if (data.indexOf("{") == 0 && data.lastIndexOf("}") == size) {
        return JSON.parse(data);
      } else if (data.indexOf("[") == 0 && data.lastIndexOf("]") == size) {
        return JSON.parse(data);
      } else {
        return data;
      }
    }
  }
  // 存储数据
  static setData(key, data) {
    if (typeof data == "object") {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    } else {
      window.sessionStorage.setItem(key, `${data}`);
    }
  }

  // 获取存储数据 -异步
  static getAsyncData(key) {
    const data = window.sessionStorage.getItem(key);
    if (data === null) {
      return null;
    } else {
      const size = data.length - 1;
      if (data.indexOf("{") == 0 && data.lastIndexOf("}") == size) {
        return JSON.parse(data);
      } else if (data.indexOf("[") == 0 && data.lastIndexOf("]") == size) {
        return JSON.parse(data);
      } else {
        return data;
      }
    }
  }
  // 存储数据 -异步
  static setAsyncData(key, data) {
    if (typeof data == "object") {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    } else {
      window.sessionStorage.setItem(key, `${data}`);
    }
  }

  // 移除指定的数据
  static remove(key) {
    window.sessionStorage.removeItem(key);
  }

  // 清空存储
  static clear() {
    window.sessionStorage.clear();
  }
}
