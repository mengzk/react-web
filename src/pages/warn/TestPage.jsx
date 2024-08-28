/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React from "react";
import { Form } from "antd-mobile";
import Search from "../../components/search/index";

function TestPage() {
  function onResult(value, e) {
    console.log("onResult", value, e);
  }

  function onFinish(e) {
    console.log("onSubmit", e);
  }

  return (
    <div className="test">
      <h1>测试代码</h1>

      <Form onFinish={onFinish}>
        <Form.Item name="title">
          <Search
            mode="line"
            searchBtn={false}
            // onResult={onResult}
          />
        </Form.Item>
        <Form.Item name="drawings">
          <Search
            hasBack
            value=""
            leftIcon="saoma"
            hasSearchIcon={false}
            btnStyle="inside"
            onResult={onResult}
          />
        </Form.Item>

        <button style={{ width: 100, height: 40 }} type="submit">
          提交
        </button>
      </Form>
    </div>
  );
}

export default TestPage;
