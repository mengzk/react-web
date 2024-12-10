/**
 * Author: Meng
 * Date: 2024-11-20
 * Modify: 2024-11-20
 * Desc: 鸿蒙调用兼容
 */
import { removeHMEmit, nativeHMEmit } from "./emitter";

let bnqHm = window.bnq || {}; // 与原生通信的对象

window.addEventListener("load", () => {
  bnqHm = window.bnq || {};
});

class Tools {
  // 监听原生消息
  static nativeEmit(key, callback) {
    nativeHMEmit(key, callback);
  }

  // 移除监听
  static removeEmit(key) {
    removeHMEmit(key);
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
  static listener(arg, callback) {
    bnqHm.listener(arg);
    Tools.nativeEmit(arg.key, callback);
  }

  /**
   * ❗️移除长监听
   */
  static remove(arg) {
    bnqHm.remove(arg);
  }

  /**
   * 发送消息
   */
  static emit(arg) {
    bnqHm.emit(arg);
  }

  /**
   * 页面跳转
   */
  static navigate(arg) {
    bnqHm.navigate(arg);
  }
  /**
   * 页面跳转
   */
  static push(arg) {
    bnqHm.push(arg);
  }
  /**
   * 页面返回
   */
  static back(arg) {
    bnqHm.back(arg);
  }
  /**
   * 页面替换
   */
  static replace(arg) {
    bnqHm.replace(arg);
  }

  /**
   * h5路由栈到顶可以关闭H5页面
   */
  static routeStack(canBack) {
    bnqHm.routeStack(canBack);
  }

  /**
   * 清除缓存
   */
  static clearCache(arg) {
    bnqHm.clearCache(arg);
  }

  /**
   * 登录帐号
   */
  static login(tag, callback) {
    bnqHm.login(tag).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 退出登录
   */
  static logout() {
    bnqHm.logout();
  }

  /**
   * 获取个人信息
   */
  static userInfo(mode, callback) {
    const info = bnqHm.userInfo(mode);
    callback && callback(info);
  }

  /**
   * 获取设备信息
   */
  static deviceInfo(_, callback) {
    const info = bnqHm.deviceInfo();
    callback && callback(info);
  }

  static getToken(_, callback) {
    const info = bnqHm.getToken();
    callback && callback(info);
  }

  /**
   * 获取设备屏幕相关信息
   */
  static appInfo(_, callback) {
    const info = bnqHm.appInfo();
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

    const list = []; // 10链接；20图片；30微信；40小程序；50企业微信；60飞书

    (arg.shareChannel || [1]).forEach((channel) => {
      // 类型 1微信 2朋友圈  4qq  5Qzone 100复制链接 101海报分享
      switch (channel) {
        case 1:
          list.push({
            channel: 30,
            env: arg.version,
            url: arg.copyUrl,
            title: arg.title,
            desc: arg.description,
            openId: arg.miniProgramId,
            appId: arg.appId,
            image: arg.img,
            path: arg.path,
            path: arg.miniProgramPageUrl,
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
            channel: 10,
            link: arg.copyUrl,
          });
          break;
        default:
          break;
      }
    });

    bnqHm.share({ title: arg.title, data: list });
  }

  /**
   * 系统分享
   */
  static sysShare(arg) {
    bnqHm.sysShare(arg);
  }

  /**
   * 配置标题栏
   */
  static headerConfig(arg) {
    bnqHm.headerConfig(arg);
  }

  /**
   * 扫二维码
   */
  static qrcodeScan(_, callback) {
    bnqHm.qrcodeScan().then((res) => {
      callback && callback(res);
    });
  }

  /**
   *
   */
  static watermarkPhoto(arg, callback) {
    bnqHm.openCamera({ upload: true, content: [] }).then((res) => {
      let img = (res || {}).data;
      callback && callback(img ? [img] : []);
    });
  }
  /**
   * 打开相机
   */
  static openCamera(arg, callback) {
    bnqHm.openCamera(arg).then((res) => {
      let img = (res || {}).data;
      callback && callback(img ? [img] : []);
    });
  }

  /**
   * 打开相册
   */
  static chooseAlbum(arg, callback) {
    bnqHm.chooseAlbum(arg).then((res) => {
      let imgs = (res || {}).list || [];
      callback && callback(imgs);
    });
  }

  /**
   * 打开媒体库
   */
  static chooseMedia(arg, callback) {
    bnqHm.chooseMedia(arg).then((res) => {
      let files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 选择文件
   */
  static chooseFile(arg, callback) {
    bnqHm.chooseFile(arg).then((res) => {
      let files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 预览图片/视频
   * 视频要加上 video: true
   */
  static previewAlbum(arg) {
    bnqHm.previewAlbum(arg);
  }

  /**
   * 预览文档
   */
  static previewDocs(arg) {
    bnqHm.previewDocs(arg);
  }

  /**
   * 打开文件
   */
  static openFolder(arg, callback) {
    bnqHm.openFolder(arg).then((res) => {
      const files = (res || {}).list || [];
      callback && callback(files);
    });
  }

  /**
   * 打开设置
   */
  static openSetting(arg) {
    bnqHm.openSetting(arg);
  }

  /**
   * 录音
   */
  static record(args, callback) {
    bnqHm.record(args).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 声音播放
   */
  static audioPlayer(args) {
    bnqHm.audioPlayer(args);
  }

  /**
   * 打开app
   */
  static openLink(arg) {
    bnqHm.openLink(arg);
  }

  /**
   * 发送短信
   */
  static sendSms(arg) {
    bnqHm.sendSms(arg);
  }

  /**
   * 拨打电话
   */
  static callPhone(arg) {
    bnqHm.callPhone(arg);
  }

  /**
   * 直播
   * @param arg
   */
  static liveVideo(arg) {
    bnqHm.liveVideo(arg);
  }

  /**
   * 选择地址
   */
  static chooseAddress(_, callback) {
    bnqHm.chooseAddress().then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取当前定位
   */
  static getLocation(geocode, callback) {
    bnqHm.getLocation(geocode).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 打开地图导航
   */
  static mapNavigation(arg) {
    bnqHm.mapNavigation(arg);
  }

  /**
   * 打开小程序
   */
  static openApplet(arg) {
    bnqHm.openApplet(arg);
  }

  /**
   * 微信分享
   */
  static wechatShare(arg) {
    bnqHm.wechatShare(arg);
  }

  /**
   * 唤起收银台
   */
  static cashier(arg) {
    bnqHm.cashier(arg);
  }
  /**
   * 检查权限
   */
  static checkPermission(permissions, callback) {
    bnqHm.checkPermission(permissions).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取权限
   */
  static requestPermission(permissions, callback) {
    bnqHm.requestPermission(permissions).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 获取网络状态
   */
  static networkStatus(_, callback) {
    const state = bnqHm.networkStatus();
    callback && callback(state);
  }

  /**
   * 上传文件
   */
  static uploadFile(params, callback) {
    bnqHm.uploadFile(params).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 下载文件
   */
  static downloadFile(params, callback) {
    bnqHm.downloadFile(params).then((res) => {
      callback && callback(res);
    });
  }

  /**
   * 保存文件
   */
  static saveFile(params) {
    bnqHm.saveFile(params);
  }

  /**
   * 读取文件
   */
  static readFile(arg, callback) {
    const file = bnqHm.readFile(arg);
    callback && callback(file);
  }

  /**
   * 保存数据
   */
  static setStorage(arg) {
    bnqHm.setStorage(arg);
  }

  /**
   * 获取数据
   */
  static getStorage(key, callback) {
    const item = bnqHm.getStorage(key);
    callback && callback(item);
  }

  /**
   * 删除数据
   */
  static removeStorage(key) {
    bnqHm.removeItem(key);
  }
  /**
   * 删除数据
   */
  static clearStorage() {
    bnqHm.clearStorage();
  }

  /**
   * 是否是debug模式
   */
  static isDebug(_, callback) {
    const bug = bnqHm.isDebug();
    callback && callback(bug);
  }

  /**
   * 显示加载框
   */
  static showLoading(text) {
    bnqHm.showLoading(text);
  }
  /**
   * 隐藏加载框
   */
  static hideLoading() {
    bnqHm.hideLoading();
  }
  /**
   * 显示toast
   */
  static toast(arg) {
    bnqHm.toast(arg);
  }
  /**
   * 重新加载
   */
  static reload() {
    bnqHm.reload();
  }
}

export default Tools;
