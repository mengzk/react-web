/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState, useRef } from "react";
import "./test.css";

function TestPage() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  function onResult(value, e) {
    console.log("onResult", value, e);
  }

  function onFinish(e) {
    console.log("onSubmit", e);
  }

  function onTest() {
    // console.log("onTest bnq", window.bnqBridge);
    if (window.bnqBridge) {
      window.bnqBridge.emit({ event: "takePhoto", data: { name: "test" } });
    }
  }

  function onChoosePhoto() {
    if (window.bnqBridge) {
      const test = window.bnqBridge.choosePhoto();
      console.log("onTest res ", test);
    }
  }

  function onChooseFile() {
    if (window.bnqBridge) {
      const test = window.bnqBridge.emit();
    }
  }

  return (
    <div className="test">
      <h1>测试鸿蒙</h1>

      <div className="test-actions">
        <button onClick={onChoosePhoto}>选择照片</button>
        <button onClick={onChooseFile}>选择文件</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
        <button onClick={onTest}>拍摄照片</button>
      </div>
    </div>
  );
}

export default TestPage;
