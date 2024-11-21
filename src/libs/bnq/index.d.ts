/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 调用原生Api
 */
import HMApi from "./src/hmApi";

/**
 * 调用原生方法 -通用(rn, hm)
 * @param key      方法名
 * @param data     参数
 * @param callback 回调函数
 * @param version  版本号 默认2
 */
declare function bnqBridge(
  key: string,
  data: any,
  callback: (res: any) => void,
  version?: number
): void;

/**
 * 向原生发送Emitter消息
 * @param key  方法名
 * @param data 参数
 */
declare function bnqEmitter(key: string, data: any): void;

/**
 * 发送消息
 */
declare function compatInvoke(
  key: string,
  data: any,
  callback: (res: any) => void
): void;

export { HMApi, bnqBridge, bnqEmitter, compatInvoke };
