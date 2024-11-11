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
    // console.log("onTest bnq", window.bnq);
    if (window.bnq) {
      window.bnq.emit({ event: "takePhoto", data: { name: "test" } });
    }
  }

  function onChoosePhoto() {
    if (window.bnq) {
      const test = window.bnq.choosePhoto();
      console.log("onTest res ", test);
    }
  }

  function onChooseFile() {
    if (window.bnq) {
      const test = window.bnq.emit();
    }
  }

  function onShare() {
    if (window.bnq) {
      window.bnq.share({
        title: "分享",
        data: [
          {mold: 1, title: '', desc: '分享内容', url: 'https://www.baidu.com'},
          {mold: 1, title: '', desc: '分享内容', url: 'https://www.baidu.com'},
        ],
      });
    }
  }

  function onNav() {
    if (window.bnq) {
      window.bnq.mapNavigation({
        lat: 39.915, 
        lng: 116.404,
        name: '天安门',
        address: '北京市东城区东长安街天安门广场',
      });
    }
  }

  return (
    <div className="test">
      <h1>测试鸿蒙</h1>

      <div className="test-actions">
        <button onClick={onChoosePhoto}>选择照片</button>
        <button onClick={onChooseFile}>选择文件</button>
        <button onClick={onShare}>分享</button>
        <button onClick={onNav}>导航</button>
        <button onClick={onTest}>选择照片</button>
        <button onClick={onTest}>拍照/视频</button>
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
