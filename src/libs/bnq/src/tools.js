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
    HMApi.share(arg);
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
      let imgs = (res || {}).data || [];
      callback && callback(imgs);
    });
  }

  /**
   * 打开媒体库
   */
  static chooseMedia(arg, callback) {
    HMApi.chooseMedia(arg).then((res) => {
      let files = (res || {}).data || [];
      callback && callback(files);
    });
  }

  /**
   * 选择文件
   */
  static chooseFile(arg, callback) {
    HMApi.chooseFile(arg).then((res) => {
      let files = (res || {}).data || [];
      callback && callback(files);
    });
  }

  /**
   * 预览图片
   */
  static previewImage(arg) {
    HMApi.previewImage(arg);
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
      const files = (res || {}).data || [];
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
  static callPhone(phone) {
    HMApi.callPhone(phone);
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
  static saveItem(key, data) {
    HMApi.saveItem(key, data);
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
