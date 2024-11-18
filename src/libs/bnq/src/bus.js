/**
 * Author: Meng
 * Date: 2023-03-09
 * Desc: 消息订阅类
 * { event: '', mode: 订阅模式, tag: 标签, type: '类型 1单次'}
 */

let busList = []; // 事件集合

class Bus {

  // 事件注册 {key: '事件名次', callback: '事件回调函数', tag: '事件标识',type: '事件类型1单次2普通'}
  static add(key, callback, tag='', type=1) {
    if (!key || !callback) {
      console.warn('---> bus key and callback not null', key);
      return;
    }
    busList = busList.filter(e => e.key != key || e.tag != tag)
    busList.push({ key, callback, tag, type });
  }

  // 订阅单次事件
  static once(key, callback, tag) {
    Bus.add(key, callback, tag, 1)
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
    let tag = '';
    try {
      busList.forEach(e => {
        if (e.key == key) {
          tag = e.tag;
          e.callback && e.callback(data)
        }
      });
      busList = busList.filter(e => e.key != key || e.type != 1);
    } catch (error) {
      busList = busList.filter(e => e.key != key || e.tag != tag);
      console.log('bus sendMsg error;', error);
      Bus._sendMsg(key, data)
    }
  }

  // 移除消息
  static remove({ key, tag, callback } = {}) {
    if (key) {
      busList = busList.filter(e => e.key != key || e.tag != tag)
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