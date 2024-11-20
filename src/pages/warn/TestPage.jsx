/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState } from "react";
import { bnqBridge, bnqEmitter } from "../../libs/bnq/index";
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

  function onTest() {}

  function onShare() {
    // if (window.bnq) {
    //   window.bnq.share({
    //     title: "分享",
    //     data: [
    //       {
    //         mold: 1,
    //         title: "",
    //         desc: "分享内容",
    //         url: "https://www.baidu.com",
    //       },
    //       {
    //         mold: 1,
    //         title: "",
    //         desc: "分享内容",
    //         url: "https://www.baidu.com",
    //       },
    //     ],
    //   });
    // }

    bnqBridge("share", {
        copyUrl: "https://bing.com", // 分享的链接，默认使用当前网页地址
        miniProgramId: "wxa75c0de48ec3635d", //小程序原始ID 非必填需要分享小程序需要传递
        miniProgramPageUrl: "/pages/home/home", //小程序页面 非必填需要分享小程序需要传递
        isFriendNeedMiniProgram: false, // 分享微信是否是需要小程序
        isFriendCircleNeedMinProgram: false, // 分享朋友圈是否是需要小程序
        withoutShareBoard: false, // 如果为true，不弹出分享面板，直接调用分享
        shareChannel: [1, 100], // 分享面板的分享渠道 数组可包含 分享的类型 0,新浪 1,微信 2,朋友圈  4,qq  5,Qzone     100,复制链接 101,海报分享
        path: "/pages/home/home", //小程序页面路径
        description: "你有一个百安居任务，请及时处理",
        img: "https://dhstatic.bthome.com/app_icon/wechat_share.png",
        appId: "gh_200143425872",
        title: "你有一个百安居任务，请及时处理",
        mode: "mini",
        version: 2,
      });
  }
  function onChoosePhoto() {
    bnqBridge("openAppAlbum2", {}, (res) => {
      console.log("choosePhoto res ", res);
    });
  }
  function onChooseFile() {
    bnqBridge("selectFile", {}, (res) => {
      console.log("chooseFile res ", res);
      setFiles([...files, res]);
    });
  }
  function onShare2() {}
  function onNav() {
    bnqBridge(
      "openNativeMap",
      {
        lat: 30.67,
        lng: 104.07,
        name: "成都市",
        address: "成都市",
      },
      (res) => {
        console.log("nav res ", res);
      }
    );
  }
  function onToast() {
    bnqBridge("toast", { text: "提示信息" });
  }
  function onScan() {
    bnqBridge("QRCodePage", {}, (res) => {
      console.log("scan res ", res);
    });
  }
  function onCamera() {
    bnqBridge("openAppCamera2", {}, (res) => {
      console.log("camera res ", res);
      // setImgs([...imgs, res]);
    });
  }
  function onPreview() {}
  function setHeader() {}
  function onClear() {
    bnqBridge("clearCache", {});
  }
  function onDebug() {
    bnqBridge("isDeveloperMode", {}, (res) => {
      console.log("debug res ", res);
    });
  }
  function onRecord() {}
  function onMediaPlay() {}
  function getLocation() {
    bnqBridge("GetGaodeLocationV2", {}, (res) => {
      console.log("location res ", res);
    });
  }
  function onChooseAddress() {}
  function onSendSms() {}
  function onCallPhone() {
    bnqBridge("telMobile", { mobile: "10086" });
  }
  function onOpenApp() {
    bnqBridge("LinkingOpen", { url: "com.bnq.crm" });
  }
  function onSetting() {
    bnqBridge("pushToAppSetting", {});
  }
  function onOpenFolder() {
    bnqBridge("selectFile", {}, (res) => {
      console.log("openFolder res ", res);
    });
  }
  function onAppInfo() {
    bnqBridge("appInfo", {}, (res) => {
      console.log("appInfo res ", res);
    });
  }
  function onDeviceInfo() {
    bnqBridge("getDeviceInfo", {}, (res) => {
      console.log("deviceInfo res ", res);
    });
  }
  function onUserInfo() {
    bnqBridge("reqLoginInfoV2", {}, (res) => {
      console.log("userInfo res ", res);
    });
  }
  function onLogin() {}
  function onLogout() {}
  function onRemove() {}
  function onAddEmit() {}
  function onEmit() {
    bnqEmitter("refreshTaskDetail", { key: "refreshTaskDetail" });
  }
  function onPreview() {}
  function showLoading() {}
  function hideLoading() {}

  return (
    <div className="test">
      {/* <h1>测试鸿蒙</h1> */}

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
