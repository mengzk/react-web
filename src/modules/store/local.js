/**
 * Author: Meng
 * Date: 2023-09-06
 * Modify: 2023-09-06
 * Desc: 数据存储
 *
 */

export default class Local {
  // 获取存储数据
  static getStorage(key) {
    const data = window.localStorage.getItem(key);
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
  static setStorage(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    window.dispatchEvent(new Event("storage"));
  }

  // 获取存储数据 -异步
  static getAsyncStorage(key) {
    const data = window.localStorage.getItem(key);
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
  static setAsyncStorage(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    window.dispatchEvent(new Event("storage"));
  }

  // 移除指定的数据
  static remove(key) {
    window.localStorage.removeItem(key);
  }

  // 清空存储
  static clear() {
    window.localStorage.clear();
  }
}
