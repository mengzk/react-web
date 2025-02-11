/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useState, useEffect } from "react";

import { navigate } from "../../routes";
import UserItem from "../component/user-item";

import "./index.css";

function UserPage(props) {
  const [test, setTest] = useState("test");
  const [users, setUsers] = useState([
    {name: "张三里斯", sex: "男", age: 30, bloodSugar: 5.6, bloodFat: 3.2},
    {name: "王武李", sex: "男", age: 30, bloodSugar: 5.6, bloodFat: 3.2},
    {name: "三的字", sex: "男", age: 30, bloodSugar: 5.6, bloodFat: 3.2},
    {name: "张三", sex: "男", age: 30, bloodSugar: 5.6, bloodFat: 3.2},
  ]);
  useEffect(() => {
    const token = localStorage.getItem("app-token");
    setTest(token);
  }, []);

  return (
    <div className="page user-page">
      <h3 className="page-title">客户列表</h3>
      <div className="top-search-box">
        <div className="top-search-cell">
          <span>姓名:</span>
          <div>
            <input type="text" placeholder="姓名" maxLength={10} />
          </div>
        </div>
        <div className="top-search-cell">
          <span>性别:</span>
          <div>
            <input type="text" placeholder="性别"/>
          </div>
        </div>
        <div className="top-search-cell">
          <span>手机号:</span>
          <div>
            <input type="text" placeholder="手机号" maxLength={11} />
          </div>
        </div>
        <div className="top-search-cell top-search-date">
          <span>时间:</span>
          <div>
            <input type="text" placeholder="时间" />
          </div>
        </div>
        <div className="top-search-btns">
          <button>重 置</button>
          <button>搜 索</button>
        </div>
      </div>
      <div className="user-grid">
        {users.map((e, idx) => (
          <UserItem key={idx} data={e} />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
