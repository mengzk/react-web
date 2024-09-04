/**
 * Author: Meng
 * Date: 2024-09-04
 * Modify: 2024-09-04
 * Desc: 
 */
import { makeObservable, observable, computed, action, flow } from "mobx";

export default class AppStore {
  value;

  constructor(value) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
      fetch: flow,
    });
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    this.value++;
  }

  *fetch() {
    const response = yield fetch("/api/value");
    this.value = response.json();
  }
}