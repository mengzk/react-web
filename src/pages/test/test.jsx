/**
 * Author: Meng
 * Date: 2024-08-29
 * Modify: 2024-08-29
 * Desc: 
 */

import { useReducer } from 'react';
import testReducer from './testReducer.js';


let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(testReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  function taskView(task, index) {
    return(
      <div>
        <span>{task.text}</span>
        <button onClick={() => handleChangeTask({...task, done: !task.done})}>
          {task.done ? '未完成' : '已完成'}
        </button>
        <button onClick={() => handleDeleteTask(task.id)}>删除</button>
      </div>
    )
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      {tasks.map(taskView)}
      <button onClick={() => handleAddTask('新任务')}>添加任务</button>
    </>
  );
}
