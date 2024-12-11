/**
 * Author: Meng
 * Date: 2024-11-12
 * Modify: 2024-11-12
 * Desc:
 */

let bnqHm = window.bnq || {}; // 与原生通信的对象

window.addEventListener("load", loadResoue);

function loadResoue() {
  bnqHm = window.bnq || {};
}

class HMApi {
  // 监听原生消息
  static nativeEmit(key, callback) {}

  // 移除监听
  static removeEmit(key) {}

  /**
   * ❗️调用方法
   */
  static invoke(name, data = {}) {
    const methodList = Object.getOwnPropertyNames(HMApi).filter(
      (prop) => typeof HMApi[prop] === "function"
    );
    // console.log("invoke method --->", name, methodList.join(","));
    const hasMethod = methodList.includes(name);
    if (hasMethod) {
      return HMApi[name](data);
    } else {
      console.warn(`App不支持 ${name} 方法, 请联系开发人员`);
    }
  }

  /**
   * 监听 Native 消息
   */
  static listener(arg) {
    bnqHm.listener(arg);
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
  static login(tag) {
    return bnqHm.login(tag);
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
  static userInfo(mode) {
    return bnqHm.userInfo(mode);
  }

  /**
   * 获取设备信息
   */
  static deviceInfo() {
    return bnqHm.deviceInfo();
  }

  static getToken() {
    return bnqHm.getToken();
  }

  /**
   * 获取设备屏幕相关信息
   */
  static appInfo() {
    return bnqHm.appInfo();
  }

  /**
   * 显示分享面板
   */
  static share(arg) {
    bnqHm.share(arg);
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
  static qrcodeScan() {
    return bnqHm.qrcodeScan();
  }

  /**
   * 打开相机
   */
  static openCamera(arg) {
    return bnqHm.openCamera(arg);
  }

  /**
   * 打开相册
   */
  static chooseAlbum(arg) {
    return bnqHm.chooseAlbum(arg);
  }

  /**
   * 打开媒体库
   */
  static chooseMedia(arg) {
    return bnqHm.chooseMedia(arg);
  }

  /**
   * 打开文件
   */
  static chooseDocs(arg) {
    return bnqHm.chooseDocs(arg);
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
   * 打开设置
   */
  static openSetting(arg) {
    bnqHm.openSetting(arg);
  }

  /**
   * 录音
   */
  static record(args) {
    bnqHm.record(args);
  }

  /**
   * 媒体播放
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
   * 能否打开链接
   */
  static canOpenLink(arg, callback) {
    const canOpen = bnqHm.canOpenLink(arg);
    callback && callback(canOpen);
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
  static chooseAddress() {
    return bnqHm.chooseAddress();
  }

  /**
   * 获取当前定位
   */
  static getLocation(geocode) {
    return bnqHm.getLocation(geocode);
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
  static checkPermission(permissions) {
    return bnqHm.checkPermission(permissions);
  }

  /**
   * 获取权限
   */
  static requestPermission(permissions) {
    return bnqHm.requestPermission(permissions);
  }

  /**
   * 获取网络状态
   */
  static networkStatus() {
    return bnqHm.networkStatus();
  }

  /**
   * 上传文件
   */
  static uploadFile(params) {
    return bnqHm.uploadFile(params);
  }

  /**
   * 下载文件
   */
  static downloadFile(params) {
    return bnqHm.downloadFile(params);
  }

  /**
   * 保存文件
   */
  static saveFile(params) {
    return bnqHm.saveFile(params);
  }

  /**
   * 读取文件
   */
  static readFile(arg) {
    return bnqHm.readFile(arg);
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
  static getStorage(key) {
    return bnqHm.getStorage(key);
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
  static isDebug() {
    return bnqHm.isDebug();
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

export default HMApi;
