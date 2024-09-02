/**
 * Author: Meng
 * Date: 2024-09-02
 * Modify: 2024-09-02
 * Desc: 
 */
import { makeAutoObservable } from "mobx";

export default class MobxModel {
  tasks = [
    { id: 0, text: "测试页面1 02", done: false },
    { id: 1, text: "测试页面1 03", done: false },
    { id: 2, text: "打卡列侬墙", done: false },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(text) {
    this.tasks.push({
      id: this.tasks.length,
      text: text,
      done: false,
    });
  }

  changeTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[index] = task;
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((t) => t.id === taskId);
    this.tasks.splice(index, 1);
  }
}