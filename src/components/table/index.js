/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc:
 */
import React from "react";

import "./index.css";

const innerWidth = window.innerWidth;

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
