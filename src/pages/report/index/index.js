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
import Toast from "../../../components/modal/toast";
import Loading from "../../../components/modal/loading";

const columns = [
  { label: "姓名", field: "name" },
  { label: "性别", field: "age" },
  { label: "手机号", field: "phone" },
  { label: "时间", field: "email" },
];

const data = [
  { name: "John Doe", age: 28, phone: "1873884893", email: "john@example.com" },
  {
    name: "Jane Smith",
    age: 34,
    phone: "1873884893",
    email: "jane@example.com",
  },
  {
    name: "Sam Johnson",
    age: 45,
    phone: "1873884893",
    email: "sam@example.com",
  },
];
function ReportPage(props) {
  useEffect(() => {
    Loading.show();

    const timer = setTimeout(() => {
      Loading.hide();
      clearTimeout(timer);
    }, 2000);
  }, []);

  function onItemTap(row, colIndex) {
    console.log("onItemTap", row, colIndex);
    // navigate("/report/detail?id=1");

    Toast.show("onItemTap");
  }

  return (
    <div className="page reports">
      <h3 className="page-title">报告列表</h3>
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

      <Table columns={columns} data={data} onClick={onItemTap}/>
    </div>
  );
}

export default ReportPage;
