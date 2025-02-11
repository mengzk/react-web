/**
 * Author: Meng
 * Date: 2024-07-06
 * Modify: 2024-07-06
 * Desc: 
 */

export default class Bus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      return;
    }
    if (!callback) {
      this.listeners[event] = [];
    } else {
      this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    }
  }

  emit(event, data) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(fn => fn(data));
  }
}