/**
 * Author: Meng
 * Date: 2025-01-09
 * Modify: 2025-01-09
 * Desc:
 * { id: "1", value: "woman", label: "女" },
 * <div className="v-redio-item">
        <input type="radio" value="man" name="drone" id="man" />
        <label for="man">男</label>
      </div>
      <div>
        <input type="radio" value="woman" name="drone" id="woman" />
        <label for="woman">女</label>
      </div> 
 */

import React from "react";

import "./index.css";

function Redio(props) {
  const list = props.data || [];
  const value = props.value || 0;
  const disabled = props.disabled || false;

  function onChange(e) {
    console.log(e.target.value);
  }

  //
  function redioItem(item, index) {
    const checked = value == item.value;
    return (
      <div className="v-redio3-item" key={index}>
        <input
          type="radio"
          value={item.value}
          defaultChecked={checked}
          disabled={disabled}
          name="drone"
          id={item.id}
          onChange={onChange}
        />
        <label>{item.label}</label>
      </div>
    );
  }

  return <fieldset className="v-redio3">{list.map(redioItem)}</fieldset>;
}

export default Redio;
