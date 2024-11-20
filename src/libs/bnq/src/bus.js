/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 消息订阅类
 * { event: '', mode: 订阅模式, type: '类型 1单次'}
 */

let busList = []; // 事件集合

class Bus {

  // 事件注册 {key: '事件名次', callback: '事件回调函数',type: '事件类型1单次2普通'}
  static add(key, callback, type=1) {
    if (!key || !callback) {
      console.warn('---> bus key and callback not null', key);
      return;
    }
    busList = busList.filter(e => e.key != key)
    busList.push({ key, callback, type });
  }

  // 订阅单次事件
  static once(key, callback) {
    Bus.add(key, callback, 1)
  }

  // 发送消息
  static send(key, data, delay = 0) {
    if (delay > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        Bus._sendMsg(key, data)
      }, delay)
    } else {
      Bus._sendMsg(key, data)
    }
  }
  // 具体发送
  static _sendMsg(key, data) {
    try {
      busList.forEach(e => {
        if (e.key == key) {
          e.callback && e.callback(data)
        }
      });
      busList = busList.filter(e => e.key != key || e.type != 1);
    } catch (error) {
      console.log('---> bus sendMsg error;', error);
      busList = busList.filter(e => e.key != key);
      Bus._sendMsg(key, data)
    }
  }

  // 移除消息
  static remove({ key, callback } = {}) {
    if (key) {
      busList = busList.filter(e => e.key != key)
    } else {
      busList = busList.filter(e => e.callback != callback)
    }
  }

  // 清除所有消息
  static clear() {
    busList = [];
  }
}

export default Bus;