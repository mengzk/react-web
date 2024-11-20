/**
 * Author: Meng
 * Date: 2024-11-20
 * Modify: 2024-11-20
 * Desc: 鸿蒙调用兼容
 */
import HMApi from "./hmApi";

class Tools {
  // 监听原生消息
  static nativeEmit(key, callback) {
    HMApi.nativeEmit(key, callback);
  }

  // 移除监听
  static removeEmit(key) {
    HMApi.removeEmit(key);
  }

  /**
   * ❗️调用方法
   */
  static invoke(name, data = {}, callback) {
    const methodList = Object.getOwnPropertyNames(Tools).filter(
      (prop) => typeof Tools[prop] === "function"
    );
    // console.log("invoke method --->", name, methodList.join(","));
    const hasMethod = methodList.includes(name);
    if (hasMethod) {
      return Tools[name](data, callback);
    } else {
      console.warn(`App不支持 ${name} 方法, 请联系开发人员`);
    }
  }

  /**
   * 监听 Native 消息
   */
  static listener(arg) {
    HMApi.listener(arg);
  }

  /**
   * ❗️移除长监听
   */
  static remove(arg) {
    HMApi.remove(arg);
  }

  /**
   * 发送消息
   */
  static emit(arg) {
    HMApi.emit(arg);
  }

  /**
   * 页面跳转
   */
  static navigate(arg) {
    HMApi.navigate(arg);
  }
  /**
   * 页面跳转
   */
  static push(arg) {
    HMApi.push(arg);
  }
  /**
   * 页面返回
   */
  static back(arg) {
    HMApi.back(arg);
  }
  /**
   * 页面替换
   */
  static replace(arg) {
    HMApi.replace(arg);
  }

  /**
   * h5路由栈到顶可以关闭H5页面
   */
  static routeStack(canBack) {
    HMApi.routeStack(canBack);
  }

  /**
   * 清除缓存
   */
  static clearCache(arg) {
    HMApi.clearCache(arg);
  }

  /**
   * 登录帐号
   */
  static login(tag, callback) {
    HMApi.login(tag).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 退出登录
   */
  static logout() {
    HMApi.logout();
  }

  /**
   * 获取个人信息
   */
  static userInfo(mode, callback) {
    HMApi.userInfo(mode).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取设备信息
   */
  static deviceInfo(_, callback) {
    const info = HMApi.deviceInfo();
    callback && callback(info);
  }

  /**
   * 获取设备屏幕相关信息
   */
  static appInfo(_, callback) {
    const info = HMApi.appInfo();
    callback && callback(info);
  }

  /**
   * 显示分享面板
   */
  static share(arg) {
    //     copyUrl: "https://bing.com", // 分享的链接，默认使用当前网页地址
    //     miniProgramId: "wxa75c0de48ec3635d", //小程序原始ID 非必填需要分享小程序需要传递
    //     miniProgramPageUrl: "/pages/home/home", //小程序页面 非必填需要分享小程序需要传递
    //     isFriendNeedMiniProgram: false, // 分享微信是否是需要小程序
    //     isFriendCircleNeedMinProgram: false, // 分享朋友圈是否是需要小程序
    //     withoutShareBoard: false, // 如果为true，不弹出分享面板，直接调用分享
    //     shareChannel: [1, 100], // 分享面板的分享渠道 数组可包含 分享的类型 0,新浪 1,微信 2,朋友圈  4,qq  5,Qzone     100,复制链接 101,海报分享
    //     path: "/pages/home/home", //小程序页面路径
    //     description: "你有一个百安居任务，请及时处理",
    //     img: "https://dhstatic.bthome.com/app_icon/wechat_share.png",
    //     appId: "gh_200143425872",
    //     title: "你有一个百安居任务，请及时处理",
    //     mode: "mini",
    //     version: 2,

    const list = []; // 新渠道: 1链接；20图片；30微信；40小程序

    (arg.shareChannel || [1]).forEach((channel) => {
      // 类型 1,微信 2,朋友圈  4,qq  5,Qzone 100,复制链接 101,海报分享
      switch (channel) {
        case 1:
          list.push({
            channel: 30,
            url: arg.copyUrl,
            title: arg.title,
            desc: arg.description,
          });
          break;
        case 2:
          list.push({
            channel: 31,
            url: arg.copyUrl,
            title: arg.title,
            desc: arg.description,
          });
          break;
        case 100:
          list.push({
            channel: 1,
            url: arg.copyUrl,
            title: arg.title,
            desc: arg.description,
          });
          break;
        default:
          break;
      }
    });

    HMApi.share(arg);
  }

  /**
   * 系统分享
   */
  static sysShare(arg) {
    HMApi.sysShare(arg);
  }

  /**
   * 配置标题栏
   */
  static headerConfig(arg) {
    HMApi.headerConfig(arg);
  }

  /**
   * 扫二维码
   */
  static qrcodeScan(_, callback) {
    HMApi.qrcodeScan().then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 打开相机
   */
  static openCamera(arg, callback) {
    HMApi.openCamera(arg).then((res) => {
      let img = (res || {}).data;
      callback && callback(img ? [img] : []);
    });
  }

  /**
   * 打开相册
   */
  static chooseAlbum(arg, callback) {
    HMApi.chooseAlbum(arg).then((res) => {
      let imgs = (res || {}).list || [];
      callback && callback(imgs);
    });
  }

  /**
   * 打开媒体库
   */
  static chooseMedia(arg, callback) {
    HMApi.chooseMedia(arg).then((res) => {
      let files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 选择文件
   */
  static chooseFile(arg, callback) {
    HMApi.chooseFile(arg).then((res) => {
      let files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 预览图片
   */
  static previewAlbum(arg) {
    HMApi.previewAlbum(arg);
  }

  /**
   * 预览文档
   */
  static previewDocs(arg) {
    HMApi.previewDocs(arg);
  }

  /**
   * 打开文件
   */
  static openFolder(arg, callback) {
    HMApi.openFolder(arg).then((res) => {
      const files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 打开设置
   */
  static openSetting(arg) {
    HMApi.openSetting(arg);
  }

  /**
   * 录音
   */
  static record(args) {
    HMApi.record(args);
  }

  /**
   * 媒体播放
   */
  static mediaPlayer(args) {
    HMApi.mediaPlayer(args);
  }

  /**
   * 打开app
   */
  static openApp(arg) {
    HMApi.openApp(arg);
  }

  /**
   * 发送短信
   */
  static sendSms({ phone, msg = "" } = {}) {
    HMApi.sendSms(phone, msg);
  }

  /**
   * 拨打电话
   */
  static callPhone({ mobile } = {}) {
    HMApi.callPhone(mobile);
  }

  /**
   * 直播
   * @param arg
   */
  static liveVideo(arg) {
    HMApi.liveVideo(arg);
  }

  /**
   * 选择地址
   */
  static chooseAddress(_, callback) {
    HMApi.chooseAddress().then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取当前定位
   */
  static getLocation(geocode, callback) {
    HMApi.getLocation(geocode).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 打开地图导航
   */
  static mapNavigation(arg) {
    HMApi.mapNavigation(arg);
  }

  /**
   * 打开小程序
   */
  static openApplet(arg) {
    HMApi.openApplet(arg);
  }

  /**
   * 微信分享
   */
  static wechatShare(arg) {
    HMApi.wechatShare(arg);
  }

  /**
   * 唤起收银台
   */
  static cashier(arg) {
    HMApi.cashier(arg);
  }
  /**
   * 检查权限
   */
  static checkPermission(permissions, callback) {
    HMApi.checkPermission(permissions).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取权限
   */
  static requestPermission(permissions, callback) {
    HMApi.requestPermission(permissions).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取网络状态
   */
  static networkStatus(_, callback) {
    const state = HMApi.networkStatus();
    callback && callback(state);
  }

  /**
   * 保存文件
   */
  static saveFile(params) {
    HMApi.saveFile(params);
  }

  /**
   * 读取文件
   */
  static readFile({ url, path = "" } = {}, callback) {
    const file = HMApi.readFile(url, path);
    callback && callback(file);
  }

  /**
   * 保存数据
   */
  static setItem(key, data) {
    HMApi.setItem(key, data);
  }

  /**
   * 获取数据
   */
  static getItem(key, callback) {
    const item = HMApi.getItem(key);
    callback && callback(item);
  }

  /**
   * 删除数据
   */
  static removeItem(key) {
    HMApi.removeItem(key);
  }

  /**
   * 是否是debug模式
   */
  static isDebug(_, callback) {
    const bug = HMApi.isDebug();
    callback && callback(bug);
  }

  /**
   * 显示加载框
   */
  static showLoading(text) {
    HMApi.showLoading(text);
  }
  /**
   * 隐藏加载框
   */
  static hintLoading() {
    HMApi.hintLoading();
  }
  /**
   * 显示toast
   */
  static toast({ text = "", duration = 2000 } = {}) {
    HMApi.toast(text, duration);
  }
}

export default Tools;
