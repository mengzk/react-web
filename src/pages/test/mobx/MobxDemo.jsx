/**
 * Author: Meng
 * Date: 2024-08-29
 * Modify: 2024-08-29
 * Desc:
 * https://www.mobx.org.cn/README.html
 */

import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import MobxModel from "./MobxModel";
import AppPage from "../../../libs/mobx/AppComponent";

function Mobx3() {
  const [model] = useState(() => new MobxModel());
  console.log("Mobx3------->");
  return <AppPage store={model} render={TestMobx} />;
}

function TestMobx() {
  const [store] = useState(() => new MobxModel());
  console.log("TestMobx------->");
  return (
    <div>
      <h1>Mobx组件 {store.count3}</h1>
      <h3>任务列表: {store.count}</h3>
      {store.tasks.map((task, index) => (
        <div key={index}>
          <span>{task.text}</span>
          <button
            onClick={() => store.changeTask({ ...task, done: !task.done })}
          >
            {task.done ? "未完成" : "已完成"}
          </button>
          <button onClick={() => store.deleteTask(task.id)}>删除</button>
        </div>
      ))}
      <button onClick={() => store.addTask("新任务")}>添加任务</button>
    </div>
  );
}

// export default Mobx3;
export default observer(TestMobx);
