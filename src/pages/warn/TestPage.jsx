/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState } from "react";
import { rnToolV2, RNTool } from "../../libs/bnq/index";
import "./test.css";

import PDFView from "../../components/pdf";

let isLoading = false;
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
    rnToolV2.sendMsgToRN("share", {
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
    rnToolV2.sendMsgToRN("openAppAlbum2", {}, (res) => {
      console.log("choosePhoto res ", res);
    });
  }
  function onChooseFile() {
    rnToolV2.sendMsgToRN("selectFile", {}, (res) => {
      console.log("chooseFile res ", res);
      setFiles(files.concat(res));
    });
  }
  function onShare2() {
    // bnqBridge("sysShare", { url: "com.bnq.crm" });
  }
  function onNav() {
    rnToolV2.sendMsgToRN(
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
    window.postMessage(JSON.stringify({ type: "toast", data: "提示信息" }));
    rnToolV2.sendMsgToRN("toast", { msg: "提示信息" });
  }
  function onScan() {
    rnToolV2.push("QRCodePage", {}, (res) => {
      console.log("scan res ", res);
    });
  }
  function onCamera() {
    rnToolV2.sendMsgToRN("openAppCamera2", {mode: 0}, (res) => {
      console.log("camera res ", res);
      // setImgs([...imgs, res]);
    });
  }
  function onCamera2() {
    rnToolV2.sendMsgToRN("openAppCamera2", {mode: 1}, (res) => {
      console.log("camera res ", res);
      // setImgs([...imgs, res]);
    });
  }
  function onPreviewDocs() {
    // https://decorationhome.oss-cn-hangzhou.aliyuncs.com/prod/images/bigscreen/pdf/2023Yearbook.pdf
    // https://decorationhome.oss-cn-hangzhou.aliyuncs.com/files/txt/%E5%90%88%E5%90%8C%E7%AD%BE%E7%BA%A6.txt
    rnToolV2.sendMsgToRN("previewFile", { data: [
      'https://dhstatic.bthome.com/prod/images/bigscreen/fitment/4dqy_ic1.png',
      'https://dhstatic.bthome.com/prod/images/bigscreen/fitment/4dqy_ic2.png',
      'https://dhstatic.bthome.com/prod/images/bigscreen/fitment/4dqy_ic3.png',
    ] });
  }
  function setHeader() {
    const num = Math.round(Math.random() * 100);
    rnToolV2.sendMsgToRN("customConfig", {
      title: "标题-" + num,
      hideNav: true,
    });
  }
  function onClear() {
    rnToolV2.sendMsgToRN("clearCache", {});
  }
  function onDebug() {
    rnToolV2.sendMsgToRN("isDeveloperMode", {}, (res) => {
      console.log("debug res ", res);
    });
  }
  function onRecord() {
    rnToolV2.sendMsgToRN("record", {action: 'start'}, (res) => {
      console.log("record res ", res);
    });
    rnToolV2.postMessageToRN('audioRecorder-listener', 'audioRecorder', { action: 'start' }, (res) => {
      console.log(res);
    });
  }
  function onRecord2() {
    rnToolV2.sendMsgToRN("record", {action: 'pause'}, (res) => {
      console.log("record res ", res);
    });
  }
  function onRecord3() {
    rnToolV2.sendMsgToRN("record", {action: 'resume'}, (res) => {
      console.log("record res ", res);
    });
  }
  function onRecord4() {
    rnToolV2.sendMsgToRN("record", {action: 'stop'}, (res) => {
      console.log("record res ", res);
    });
  }
  function onRecord5() {
    rnToolV2.sendMsgToRN("record", {action: 'play', url: 'https://bajanju-p.oss-cn-shanghai.aliyuncs.com/c2d602b954ca4fea92f6451ae0cf7814.m4a'}, (res) => {
      console.log("record res ", res);
    });
  }
  function onRecord6() {
    rnToolV2.sendMsgToRN("record", {action: 'stopPlay'}, (res) => {
      console.log("record res ", res);
    });
  }
  function getLocation() {
    rnToolV2.sendMsgToRN("GetGaodeLocationV2", {}, (res) => {
      console.log("location res ", res);
    });
  }
  function onChooseAddress() {
    rnToolV2.sendMsgToRN("chooseAddress", {}, (res) => {
      console.log("chooseAddress res ", res);
    });
  }
  function onSendSms() {
    rnToolV2.sendMsgToRN("onSendSms", { mobile: "10086", msg: "测试短信" });
  }
  function onCallPhone() {
    rnToolV2.sendMsgToRN("telMobile", { mobile: "10086" });
  }
  function onOpenApp() {
    rnToolV2.sendMsgToRN("LinkingOpen", { link: "link://dev.test01.com" });
  }
  function onSetting() {
    rnToolV2.sendMsgToRN("pushToAppSetting", {});
  }
  function onOpenFolder() {
    rnToolV2.sendMsgToRN("chooseDocs", {}, (res) => {
      console.log("chooseDocs res ", res);
    });
  }
  function onAppInfo() {
    rnToolV2.sendMsgToRN("appInfo", {}, (res) => {
      console.log("appInfo res ", res);
    });
  }
  function onDeviceInfo() {
    rnToolV2.sendMsgToRN("getDeviceInfo", {}, (res) => {
      console.log("deviceInfo res ", res);
    });
  }
  function onUserInfo() {
    rnToolV2.sendMsgToRN("reqLoginInfoV2", {}, (res) => {
      console.log("userInfo res ", res);
    });
  }
  function onLogin() {
    rnToolV2.sendMsgToRN("login", {});
  }
  function onLogout() {
    rnToolV2.sendMsgToRN("logout", {});
  }
  function onRemove() {
    rnToolV2.emit("remove", { key: "removeMsg" });
  }
  function onAddEmit() {
    rnToolV2.emit("listener", { key: "addMsg" });
  }
  function onEmit() {
    rnToolV2.emit("refreshTaskDetail", { key: "refreshTaskDetail" });
  }
  function onPreview() {
    rnToolV2.sendMsgToRN("onPlayVideo", { video: true, url: 'https://dhstatic.bthome.com/files/video/video.mp4' });
  }
  function onDownFile() {
    const url = "https://dhstatic.bthome.com/prod/images/bigscreen/fitment/4dqy_ic1.png";
    rnToolV2.sendMsgToRN("downloadFile", { url }, (res) => {
      console.log("downloadFile res ", res);
    });
  }
  function onUploadFile() {
    rnToolV2.sendMsgToRN("uploadFile", ['/data/storage/el2/base/haps/entry/cache/4dqy_ic1.png'], (res) => {
      console.log("uploadFile res ", res);
    });
  }
  function onSaveFile() {
    rnToolV2.sendMsgToRN("saveFile", { url: imgs[0], path: '' });
  }
  function onReadFile() {
    rnToolV2.sendMsgToRN("readFile", { path: '' });
  }
  function onDelFile() {
    rnToolV2.sendMsgToRN("deleteFile", { path: '' });
  }
  function onSetItem() {
    rnToolV2.sendMsgToRN("setItem", { key: "test", value: "test" });
  }
  function onGetItem() {
    rnToolV2.sendMsgToRN("getItem", { key: "test" });
  }
  function onRemoveItem() {
    rnToolV2.sendMsgToRN("removeItem", { key: "test" });
  }
  function onClearItem() {
    rnToolV2.sendMsgToRN("clearItem", { });
  }
  function onRouteStack() {
    rnToolV2.sendMsgToRN("routeStack", { canBack: true });
  }
  function onLoading() {
    if (isLoading) {
      rnToolV2.sendMsgToRN("hideLoading", {});
    } else {
      rnToolV2.sendMsgToRN("showLoading", { text: "加载中..." });
    }
    isLoading = !isLoading;
  }

  function onChangeTitle() {
    const num = Math.round(Math.random() * 100);
    RNTool.setH5NavBarStyle({ hideNav: Date.now() % 2 === 0, title: "标题"+num });
  }

  function onPostMsgV1() {
    RNTool.sendMessage("back", { }, (res) => {
      console.log("---> res ", res);
    });
  }

  return (
    <div className="test">
      {/* <PDFView url="https://dhstatic.bthome.com/prod/images/bigscreen/pdf/2023Yearbook.pdf"/> */}
      <h3>兼容RN百安居</h3>
      <div className="test-actions">
        <button onClick={onChangeTitle}>修改标题</button>
        <button onClick={onPostMsgV1}>发消息</button>
      </div>
      <h3>兼容RN住小橙</h3>
      <div className="test-actions">
        <button onClick={onChoosePhoto}>选择照片</button>
        <button onClick={onChooseFile}>选择文件</button>
        <button onClick={onCamera}>拍照</button>
        <button onClick={onCamera2}>视频</button>
        <button onClick={onShare}>分享</button>
        <button onClick={onShare2}>系统分享</button>
        <button onClick={onNav}>导航</button>
        <button onClick={onScan}>扫码</button>
        <button onClick={onToast}>Toast</button>
        <button onClick={setHeader}>标题栏</button>
        <button onClick={onClear}>清除缓存</button>
        <button onClick={onDebug}>是否Debug</button>
        <button onClick={onRecord}>开始录音</button>
        <button onClick={onRecord2}>暂停录音</button>
        <button onClick={onRecord3}>恢复录音</button>
        <button onClick={onRecord4}>停止录音</button>
        <button onClick={onRecord5}>播放录音</button>
        <button onClick={onRecord6}>停止播放</button>
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
        <button onClick={onPreview}>播放视频</button>
        {/* <button onClick={onPreviewDocs}>预览文档</button> */}
        <button onClick={onUploadFile}>上传文件</button>
        <button onClick={onDownFile}>下载文件</button>
        <button onClick={onSaveFile}>保存文件</button>
        <button onClick={onReadFile}>读取文件</button>
        <button onClick={onDelFile}>删除文件</button>
        <button onClick={onSetItem}>保存数据</button>
        <button onClick={onGetItem}>获取数据</button>
        <button onClick={onRemoveItem}>删除数据</button>
        <button onClick={onClearItem}>清除数据</button>
        <button onClick={onRouteStack}>更新路由</button>
        <button onClick={onLoading}>加载中</button>
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
