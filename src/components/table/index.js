/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc:
 */
import React from "react";

import "./index.css";

const innerWidth = window.innerWidth;
const columns = [
  { header: 'Name', field: 'name' },
  { header: 'Age', field: 'age' },
  { header: 'Phone', field: 'phone' },
  { header: 'Email', field: 'email' },
];

const data = [
  { name: 'John Doe', age: 28, phone:'1873884893', email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, phone:'1873884893', email: 'jane@example.com' },
  { name: 'Sam Johnson', age: 45, phone:'1873884893', email: 'sam@example.com' },
];
function Table(props) {
  const { columns, data = [] } = props;

  function getCellClass(col) {
    return `${col.className || "v-table"}-column`;
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
                <td className={getCellClass(col)} key={colIndex}>
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
            <th className={getCellClass(col)} key={index}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      {tableBody()}
    </table>
  );
}

export default Table;
