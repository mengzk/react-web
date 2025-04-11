/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc: 
 */
import React from "react";

import "./index.css";

const innerWidth = window.innerWidth;
const columns = [
  { label: 'Name', field: 'name' },
  { label: 'Age', field: 'age' },
  { label: 'Phone', field: 'phone' },
  { label: 'Email', field: 'email' },
];

const data = [
  { name: 'John Doe', age: 28, phone:'1873884893', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, phone:'1873884893', email: 'jane@example.com' },
  { name: 'Sam Johnson', age: 45, phone:'1873884893', email: 'sam@example.com' },
];
function Table(props) {
  const { columns, data = [] } = props;


  function onClick() {

  }

  function getHeaderClass(col) {
    return `${col.headClass || "v-table-column"}`;
  }

  function getCellClass(col) {
    return `${col.class || "v-table-column"}`;
  }

  function tableBody() {
    if (data.length < 1) {
      return <div className="v-table-empty">暂无数据</div>;
    } else {
      return (
        <tbody className="v-table-body">
          {data.map((row, rowIndex) => (
            <tr className="v-table-tr" key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td className={getCellClass(col)} key={colIndex} onClick={() => {
                  props.onClick && props.onClick(row, colIndex);
                }}>
                  <div className="v-table-cell">{row[col.field]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }
  }

  return (
    <table className="v-table">
      <thead>
        <tr className="v-table-thead">
          {columns.map((col, index) => (
            <th className={getHeaderClass(col)} key={index}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      {tableBody()}
    </table>
  );
}

export default Table;
