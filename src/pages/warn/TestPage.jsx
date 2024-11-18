/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState, useRef } from "react";
import { bridgeTools } from "../../libs/bnq/index";
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
    try {
      bridgeTools(
        "watermarkImg",
        {title: '测试', content: '测试内容'},
        (res) => {
          console.log("bridgeTools res ", res);
        },
        2
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function onChoosePhoto() {
    if (window.bnq) {
      const res = await window.bnq.chooseAlbum({
        count: 6,
        mode: 0,
      });
      if (res.code == 0) {
        setImgs(res.list);
      }
      console.log("chooseAlbum res ", res);
    }
  }

  function onChooseFile() {
    if (window.bnq) {
      const test = window.bnq.openFolder();
    }
  }

  function onShare() {
    if (window.bnq) {
      window.bnq.share({
        title: "分享",
        data: [
          {
            mold: 1,
            title: "",
            desc: "分享内容",
            url: "https://www.baidu.com",
          },
          {
            mold: 1,
            title: "",
            desc: "分享内容",
            url: "https://www.baidu.com",
          },
        ],
      });
    }
  }

  function onShare2() {
    if (window.bnq) {
      window.bnq.sysShare({
        title: "分享",
        desc: "分享内容",
        url: "https://www.baidu.com",
      });
    }
  }

  function onNav() {
    if (window.bnq) {
      window.bnq.mapNavigation({
        lat: 39.915,
        lng: 116.404,
        name: "天安门",
        address: "北京市东城区东长安街天安门广场",
      });
    }
  }

  function onToast() {
    if (window.bnq) {
      window.bnq.toast("测试toast", 2000);
    }
  }

  function onScan() {
    if (window.bnq) {
      window.bnq.qrcodeScan();
    }
  }

  async function onCamera() {
    if (window.bnq) {
      const res = await window.bnq.openCamera({
        mode: 0,
        position: 0,
      });
      console.log("openCamera res ", res);
      if (res.code == 0) {
        setImgs([res.data]);
      }
    }
  }

  function onPreview() {
    if (window.bnq) {
      window.bnq.previewImage({
        current: 0,
        urls: [],
      });
    }
  }

  function setHeader() {
    if (window.bnq) {
      window.bnq.headerConfig({
        title: "测试标题",
        actions: [
          {
            text: "测试",
          },
        ],
      });
    }
  }
  function onClear() {
    if (window.bnq) {
      window.bnq.clearCache();
    }
  }

  function onDebug() {
    if (window.bnq) {
      window.bnq.isDebug();
    }
  }
  function onRecord() {
    if (window.bnq) {
      window.bnq.record();
    }
  }
  function onMediaPlay() {
    if (window.bnq) {
      window.bnq.mediaPlayer(
        "https://www.runoob.com/try/demo_source/movie.mp4"
      );
    }
  }
  function getLocation() {
    if (window.bnq) {
      window.bnq.getLocation();
    }
  }
  function onChooseAddress() {
    if (window.bnq) {
      window.bnq.chooseAddress();
    }
  }
  function onSendSms() {
    if (window.bnq) {
      window.bnq.sendSms("10086", "测试短信");
    }
  }
  function onCallPhone() {
    if (window.bnq) {
      window.bnq.callPhone("10086");
    }
  }
  function onOpenApp() {
    if (window.bnq) {
      window.bnq.openApp("com.bnq.app");
    }
  }
  function onSetting() {
    if (window.bnq) {
      window.bnq.openSetting();
    }
  }

  async function onOpenFolder() {
    if (window.bnq) {
      const res = await window.bnq.openFolder();
      console.log("openFolder res ", res);
      if (res.code == 0) {
        setFiles(res.list);
      }
    }
  }
  function onAppInfo() {
    if (window.bnq) {
      window.bnq.appInfo();
    }
  }
  function onDeviceInfo() {
    if (window.bnq) {
      window.bnq.deviceInfo();
    }
  }
  function onUserInfo() {
    if (window.bnq) {
      window.bnq.userInfo();
    }
  }
  function onLogin() {
    if (window.bnq) {
      window.bnq.login();
    }
  }
  function onLogout() {
    if (window.bnq) {
      window.bnq.logout();
    }
  }
  function onRemove() {
    if (window.bnq) {
      window.bnq.remove();
    }
  }
  function onAddEmit() {
    if (window.bnq) {
      window.bnq.listener("test", onResult);
    }
  }
  function onEmit() {
    if (window.bnq) {
      window.bnq.emit("test", "测试");
    }
  }
  function onPreview() {
    if (window.bnq) {
      window.bnq.previewDocs({
        index: 0,
        data: [],
      });
    }
  }
  function showLoading() {
    if (window.bnq) {
      window.bnq.showLoading("加载中...");
    }
  }
  function hideLoading() {
    if (window.bnq) {
      window.bnq.hideLoading();
    }
  }

  return (
    <div className="test">
      {/* <h1>测试鸿蒙</h1> */}

      <button onClick={onTest}>测试住小橙</button>
      <div className="test-actions">
        <button onClick={onChoosePhoto}>选择照片</button>
        <button onClick={onChooseFile}>选择文件</button>
        <button onClick={onCamera}>拍照/视频</button>
        <button onClick={onShare}>分享</button>
        <button onClick={onShare2}>系统分享</button>
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
        <button onClick={onOpenFolder}>打开文件夹</button>
        <button onClick={onAppInfo}>应用信息</button>
        <button onClick={onDeviceInfo}>设备信息</button>
        <button onClick={onUserInfo}>用户信息</button>
        <button onClick={onLogin}>登录账号</button>
        <button onClick={onLogout}>退出账号</button>
        <button onClick={onRemove}>移除消息</button>
        <button onClick={onAddEmit}>添加消息</button>
        <button onClick={onEmit}>发送消息</button>
        <button onClick={onPreview}>预览图片</button>
        <button onClick={showLoading}>showLoading</button>
        <button onClick={hideLoading}>hideLoading</button>
      </div>

      <div className="grid-box">
        {imgs.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </div>

      <div className="list-box">
        {files.map((item, index) => {
          const fileName = item.split("/").pop();
          return <span key={index}>{fileName}</span>;
        })}
      </div>
    </div>
  );
}

export default TestPage;
