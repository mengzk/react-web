/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 
 */
import React from "react";

import "./index.css";
import { navigate } from "../../../routes";

export default class List extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    console.log("Product List Page Mounted");
  }

  render() {
    return (
      <div>
        <h1>Product List</h1>
        <button onClick={() => navigate("/product/detail")}>Go to Detail</button>
      </div>
    );
  }
}
