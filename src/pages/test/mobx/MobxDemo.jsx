/**
 * Author: Meng
 * Date: 2024-08-29
 * Modify: 2024-08-29
 * Desc:
 * https://www.mobx.org.cn/README.html
 */

import React, {useState} from "react";
import { observer } from "mobx-react-lite";

import MobxModel from "./MobxModel";

function TestMobx(props) {
  const [model] = useState(() => new MobxModel());

  return (
    <div>
      <h1>Mobx组件</h1>
      {model.tasks.map((task, index) => (
        <div key={index}>
          <span>{task.text}</span>
          <button onClick={() => model.changeTask({ ...task, done: !task.done })}>
            {task.done ? "未完成" : "已完成"}
          </button>
          <button onClick={() => model.deleteTask(task.id)}>删除</button>
        </div>
      ))}
      <button onClick={() => model.addTask("新任务")}>添加任务</button>
    </div>
  );
}

export default observer(TestMobx);