/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState, useRef } from "react";
import "./test.css";

function TestPage() {
  const [imgs, setImgs] = useState([]);
  const [files, setFiles] = useState([]);

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

  function onToast(){
    if (window.bnq) {
      window.bnq.toast('测试toast', 2000);
    }
  }

  function onScan(){
    if (window.bnq) {
      window.bnq.scanCode();
    }
  }

  function onCamera(){
    if (window.bnq) {
      window.bnq.scanCode();
    }
  }

  function onPreview(){
    if (window.bnq) {
      window.bnq.previewImage({
        current: 0,
        urls: [],
      });
    }
  }

  function showLoading(){}
  function hideLoading(){}
  function setHeader(){}
  function onClear(){}

  function onDebug(){}
  function onRecord(){}
  function onMediaPlay(){}
  function getLocation(){}
  function onChooseAddress(){}
  function onSendSms(){}
  function onCallPhone(){}
  function onOpenApp(){}
  function onSetting(){}



  return (
    <div className="test">
      {/* <h1>测试鸿蒙</h1> */}

      <div className="test-actions">
        <button onClick={onChoosePhoto}>选择照片</button>
        <button onClick={onChooseFile}>选择文件</button>
        <button onClick={onCamera}>拍照/视频</button>
        <button onClick={onShare}>分享</button>
        <button onClick={onNav}>导航</button>
        <button onClick={onScan}>扫码</button>
        <button onClick={onToast}>Toast</button>
        <button onClick={setHeader}>标题栏</button>
        <button onClick={onClear}>清除缓存</button>
        <button onClick={onDebug}>是否Debug</button>
        <button onClick={onRecord}>录音</button>
        <button onClick={onMediaPlay}>媒体播放</button>
        <button onClick={getLocation}>获取定位</button>
        <button onClick={onChooseAddress}>选择位置</button>
        <button onClick={onSendSms}>发送短信</button>
        <button onClick={onCallPhone}>拨打电话</button>
        <button onClick={onOpenApp}>打开App</button>
        <button onClick={onSetting}>打开设置</button>
        <button onClick={onTest}>打开文件夹</button>
        <button onClick={onTest}>应用信息</button>
        <button onClick={onTest}>设备信息</button>
        <button onClick={onTest}>用户信息</button>
        <button onClick={onTest}>登录账号</button>
        <button onClick={onTest}>退出账号</button>
        <button onClick={onTest}>移除消息</button>
        <button onClick={onTest}>添加消息</button>
        <button onClick={onTest}>发送消息</button>

        <button onClick={onPreview}>预览图片</button>
        <button onClick={showLoading}>showLoading</button>
        <button onClick={hideLoading}>hideLoading</button>
      </div>

      <div className="grid-box">
        {imgs.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </div>

      <div className="grid-box">
        {files.map((item, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
}

export default TestPage;
