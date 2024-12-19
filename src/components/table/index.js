/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc:
 */
import React, { useRef, useState, useEffect } from "react";

import "./index.css";

const innerWidth = window.innerWidth;

function Table(props) {
  const { columns, data } = props;

  useEffect(() => {}, []);

  function getCellClass(col) {
    return `${col.className || "v-table"}-column`;
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
      <tbody className="v-table-tbody">
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
    </table>
  );
}

export default Table;
