/**
 * Author: Meng
 * Date: 2023-09-06
 * Modify: 2023-09-06
 * Desc:
 */
export default interface IStorage {

  // 获取存储数据
  getUserInfo<T>(): T | null;

  // 存储数据
  setUserInfo<T>(data?: T): void;

  // 获取存储数据
  getStorage<T>(key: string): T | null;

  // 存储数据
  setStorage<T>(key: string, data: T): void;

  // 获取存储数据 -异步
  getAsyncStorage<T>(key: string): T | null;

  // 存储数据 -异步
  setAsyncStorage<T>(key: string, data: T): void;

  // 移除指定的数据
  removeStorage(key: string): void;

  // 清空存储
  clearStorage(): void;
}
