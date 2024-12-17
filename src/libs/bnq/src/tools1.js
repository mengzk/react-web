/**
 * Author:
 * Date: 2023-03-09
 * Desc: 第一版
 */
import { postMessage, hmDevice } from "./emitter";
import Tools from "./tools";
import { methodMap } from "./rnToHm";

let toolOption = null;
class RNTool {
  /**
   * 添加配置 -解析数据函数
   * @param option
   */
  static setConfig(option) {
    toolOption = option;
  }

  // 可用于处理返回数据
  static formatData(data) {
    // console.log(data);
    if (toolOption) {
      return toolOption.dataFormat(data);
    }
    return data;
  }
  /**
   * @deprecated 将于下个版本 被弃用
   */
  static sendMessage(key, data = {}, callback) {
    const hm = hmDevice();
    if (hm) {
      let event = methodMap[key];
      if (!event) {
        event = key;
      }
      Tools.invoke(event, data, callback);
    } else {
      let requestId = `${key}-${Date.now()}`;
      const callNotNull = callback != null;
      postMessage({ requestId, key, data })
        .then((res) => {
          if (callNotNull) {
            callback(RNTool.formatData(res));
          }
        })
        .catch((err) => {
          console.error("postMessageToRN", err);
          console.log(key, data);
          if (callNotNull) {
            callback(null);
          }
        });
    }
  }

  /**
   * 查询native设备信息
   * @deprecated 弃用，将于下个版本移除
   */
  static requestDeviceInfo(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.deviceInfo({}, callback);
    } else {
      RNTool.sendMessage("deviceInfo", null, callback);
    }
  }

  // 查询native设备id
  static requestDeviceId(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.deviceInfo({}, callback);
    } else {
      RNTool.sendMessage("deviceId", null, callback);
    }
  }

  /*
   * 查询native登录信息
   * forceToLoginIfNot ： true 表示如果native端没有登录，则进行登录，并返回登录用户信息。
   * false 表示native端如果登录了则返回登录用户信息，如果没有登录则返回空的用户信息
   * */
  static requestLoginInfo(needLogin, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.login({ needLogin }, callback);
    } else {
      RNTool.sendMessage(
        "reqLoginInfo",
        needLogin || { action: "needLogin" },
        callback
      );
    }
  }

  // 请求native端当前选择城市
  static requestCurrentCity(callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool.sendMessage("reqCurrentCity", null, callback);
    }
  }

  // 读取native给web端配置的初始化数据
  static requestWebInitData(callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool.sendMessage("getWebInitData", null, callback);
    }
  }

  // 顶部刘海的高度
  static reqTopSafeInset(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.deviceInfo({}, callback);
    } else {
      RNTool.sendMessage("reqTopSafeInset", null, callback);
    }
  }

  // 底部刘海的高度
  static reqBottomSafeInset(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.deviceInfo({}, callback);
    } else {
      RNTool.sendMessage("reqBottomSafeInset", null, callback);
    }
  }

  static useWebViewSafeBottom(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.deviceInfo({}, callback);
    } else {
      RNTool.sendMessage("bottomOffset", { value: "useSafeBottom" }, callback);
    }
  }

  /*
   * push到一个新的native界面
   * routerName native端的 routerName。（不知道routerName，请咨询app端开发）
   * param native router需要的参数
   * */
  static pushToRouter(pname, param, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.push({ path: pname, params: param });
    } else {
      let data = { pname, param };
      RNTool.sendMessage("push", data, callback);
    }
  }

  // redirect到一个新的native界面
  static redirectToRouter(pname, param, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.replace({ path: pname, params: param });
    } else {
      let data = { pname, param };
      RNTool.sendMessage("redirectTo", data, callback);
    }
  }

  // 退出当前webView原生界面
  static nativeBackPage(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.back();
    } else {
      RNTool.sendMessage("back", null, callback);
    }
  }

  // 将native导航栏上的返回按钮设置为：点击即退出当前webView。（该按钮功能默认是：优先返回前一个网页，当没有前一个网页时才会退出当前webView）
  static closeRouterOnBack(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.back();
    } else {
      RNTool.sendMessage("closeOnBack", null, callback);
    }
  }

  /* 设置native导航栏样式
      option: {
          hideNav: false, // 隐藏导航栏
          navibarStyle: 'dark', // 目前仅支持两种 'light' 'dark'
          transparent: false, // 导航栏是否支持透明
          supportShare: true, // 是否支持分享
          transparentOnDrag:true, //导航栏渐变
      }
   */
  static setH5NavBarStyle(option, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.headerConfig(option, callback);
    } else {
      let data = { url: window.location.href, ...option };
      RNTool.sendMessage("customConfig", data, callback);
    }
  }

  /*
  * 设置分享内容
  * shareData : {
          // title:'分享标题，不传则默认使用网页title',
          // content:'分享副标题，默认为空',
          // iconUrl:'分享缩略图，默认使用百安居logo'
          // url: '', 分享的链接，默认使用当前网页地址
          // miniProgramId: '', 小程序原始ID 非必填需要分享小程序需要传递
          // miniProgramPageUrl: '',  小程序页面 非必填需要分享小程序需要传递
          // isFriendNeedMiniProgram: false, 分享微信是否是需要小程序
          // isFriendCircleNeedMinProgram: false, 分享朋友圈是否是需要小程序
          // withoutShareBoard: false, 如果为true，不弹出分享面板，直接调用分享
          // shareChannel: '', 分享面板的分享渠道 数组可包含 分享的类型 0,新浪 1,微信 2,朋友圈  4,qq  5,Qzone     100,复制链接 101,海报分享
          // posterShareJS:{ 若有海报分享，则需要传递海报分享的对象
              //             price:0,价格
              //             title:'', 标题
              //             qrcodeUrl:'', 小程序二维码
              //             mainImgUrl:'', 海报图片
              //             shareChannel: [1,2],//数组可包含 分享的类型 0,新浪 1,微信 2,朋友圈  4,qq  5,Qzone
              //             // 100,复制链接 101,海报分享
              //           }
  *       }
  * */
  static sendShareData(shareData, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.share(option, callback);
    } else {
      RNTool.sendMessage("shareData", shareData, callback);
    }
  }

  // 调用native支付能力
  // payload: 1:支付宝    2,微信
  // orderInfo 网关返回的订单信息
  static payByNative(payload, orderInfo, callback) {
    let key = "payment";
    let sendData = { key, orderInfo, payload };
    const hm = hmDevice();
    if (hm) {
      Tools.cashier(sendData, callback);
    } else {
      RNTool.sendMessage("payment", sendData, callback);
    }
  }

  /*
   * 调用native端埋点能力
   * pageId: 页面id
   * eventId: 事件id
   * param: 埋点需要携带的其它参数
   * */
  static touchEvent(pageId, eventId, param, callback) {
    let data = { pageId, eventId, param };
    RNTool.sendMessage("touchEvent", data, callback);
  }

  /*
   * 调用native打电话的能力
   * mobile 电话号码
   * title alert标题
   * */
  static tellMobile(mobile, title, callback) {
    let data = { mobile, title };
    const hm = hmDevice();
    if (hm) {
      Tools.callPhone(data, callback);
    } else {
      RNTool.sendMessage("telMobile", data, callback);
    }
  }

  /*
   * 调用native端在线咨询的能力
   * data: 留资那一套数据：渠道号、cityCode 等等，用于埋点
   * */
  static onlineConsult(data, callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool.sendMessage("onlineConsult", data, callback);
    }
  }

  // 调用native留资能力
  static appointServices(data, callback) {
    let key = "companyAppointService";
    let sendData = { key, ...data };
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool.sendMessage("companyAppointService", sendData, callback);
    }
  }

  /*
   跳转bnq小程序
   appId:  小程序id
   path:	跳转的页面路径
   downloadUrl: 小程序下载地址（如果App内还没有安装此小程序，则会通过downloadUrl下载）
   */
  static launchBnqApp(
    appId = "",
    path = "",
    downloadUrl = "",
    version = "",
    callback
  ) {
    let data = { appId, path, version, downloadUrl };
    const hm = hmDevice();
    if (hm) {
      Tools.openApp(data, callback);
    } else {
      RNTool.sendMessage("launchBnqApp", data, callback);
    }
  }

  // 跳转微信小程序
  static launchWechatApp(userName, path, callback) {
    let data = { userName, path };
    const hm = hmDevice();
    if (hm) {
      Tools.openApplet(data, callback);
    } else {
      RNTool.sendMessage("launchWechatApp", data, callback);
    }
  }

  /*
      跳转工地直播
      data : {
          token,
          serial,
          channel,
          verifyCode,
          HIDE_FUNCTION:'1,2',//1;//分享,2;//解除绑定,3;//投诉建议,4;//联系人
          shareUrl
      }
   */
  static launchLivePhoto(data, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.liveVideo(data, callback);
    } else {
      RNTool.sendMessage("liveVideo", data, callback);
    }
  }

  // 调用扫码能力
  static gotoScan(callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.qrcodeScan({}, callback);
    } else {
      RNTool.sendMessage("gotoScan", null, callback);
    }
  }
}

export default RNTool;
