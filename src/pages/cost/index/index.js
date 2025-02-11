/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 
 */
import React, { useState, useEffect } from "react";

import Table from "../../../components/table";
import "./index.css";
import { navigate } from "../../routes";

const columns = [
  { label: '公司名称', field: 'name' },
  { label: '余额', field: 'age' },
  { label: '手机号', field: 'phone' },
  { label: '充值方式', field: 'email' },
];

const data = [
  { name: 'John Doe', age: 28, phone:'1873884893', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, phone:'1873884893', email: 'jane@example.com' },
  { name: 'Sam Johnson', age: 45, phone:'1873884893', email: 'sam@example.com' },
];
function CostPage(props) {
  useEffect(() => {}, []);

  return (
      <div className="page costs">
        <h3 className="page-title">费用列表</h3>
      <div className="top-search-box">
        <div className="top-search-cell">
          <span>状态:</span>
          <div>
            <input type="text" placeholder="姓名" maxLength={10} />
          </div>
        </div>
        <div className="top-search-cell">
          <span>公司:</span>
          <div>
            <input type="text" placeholder="性别"/>
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
        <Table columns={columns} data={data}/>
      </div>
  );
}

export default CostPage;
