/**
 * Author: Meng
 * Date: 2024-11-12
 * Modify: 2024-11-12
 * Desc:
 */

let bnqHm = window.bnq || {}; // 与原生通信的对象

class HMApi {
  /**
   * ❗️调用方法
   */
  static invoke(name, data) {
    const hasMethod = Object.prototype.hasOwnProperty.call(HMApi, name);
    if (hasMethod) {
      return bnqHm[name](data);
    } else {
      console.log("App Apis", Object.keys(bnqHm));
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
  static remove(arg) {}

  /**
   * 发送消息
   */
  static emit(arg) {}

  /**
   * 页面跳转
   */
  static navigate(arg) {}
  /**
   * 页面跳转
   */
  static push(arg) {}
  /**
   * 页面返回
   */
  static back(arg) {}
  /**
   * 页面替换
   */
  static replace(arg) {}

  /**
   * 清除缓存
   */
  static clearCache(arg) {}

  /**
   * 登录帐号
   */
  static login(tag) {}

  /**
   * 退出登录
   */
  static logout() {}

  /**
   * 获取个人信息
   */
  static userInfo(mode) {}

  /**
   * 获取设备信息
   */
  static deviceInfo() {}

  /**
   * 获取设备屏幕相关信息
   */
  static screenInfo() {}

  /**
   * 显示分享面板
   */
  static share(arg) {}

  /**
   * 配置标题栏
   */
  static headerConfig(arg) {}

  /**
   * 扫二维码
   */
  static qrcodeScan() {}

  /**
   * 打开相机
   */
  static openCamera(arg) {}

  /**
   * 打开相册
   */
  static chooseGallery(arg) {}

  /**
   * 打开媒体库
   */
  static chooseMedia(arg) {}

  /**
   * 选择文件
   */
  static chooseFile(arg) {}

  /**
   * 预览图片
   */
  static previewImage(arg) {}

  /**
   * 预览文档
   */
  static previewDocs(arg) {}

  /**
   * 打开文件
   */
  static openFolder(arg) {}

  /**
   * 打开设置
   */
  static openSetting(arg) {}

  /**
   * 录音
   */
  static record(args) {}

  /**
   * 媒体播放
   */
  static mediaPlayer(args) {}

  /**
   * 打开app
   */
  static openApp(arg) {}

  /**
   * 发送短信
   */
  static sendSms(phone, msg) {}

  /**
   * 拨打电话
   */
  static callPhone(phone, text) {}

  /**
   * 直播
   * @param arg
   */
  static liveVideo(arg) {}

  /**
   * 打开在线客服
   */
  static openOnline(arg) {}

  /**
   * 选择地址
   */
  static chooseAddress() {}

  /**
   * 获取当前定位
   */
  static getLocation(geocode) {}

  /**
   * 打开地图导航
   */
  static mapNavigation(arg) {}

  /**
   * 打开小程序
   */
  static openApplet(arg) {}

  /**
   * 微信分享
   */
  static wechatShare(arg) {}

  /**
   * 唤起收银台
   */
  static cashier(arg) {}
  /**
   * 检查权限
   */
  static checkPermission(permissions) {}

  /**
   * 获取权限
   */
  static requestPermission(permissions) {}

  /**
   * 获取网络状态
   */
  static networkStatus() {}

  /**
   * 保存文件
   */
  static saveFile(params) {}

  /**
   * 读取文件
   */
  static readFile(url, path) {}

  /**
   * 保存数据
   */
  static saveItem(key, data) {}

  /**
   * 获取数据
   */
  static getItem(key) {}

  /**
   * 删除数据
   */
  static removeItem(key) {}

  /**
   * 是否是debug模式
   */
  static isDebug() {}

  /**
   * 显示加载框
   */
  static showLoading(text) {}
  /**
   * 隐藏加载框
   */
  static hintLoading() {}
  /**
   * 显示toast
   */
  static toast() {}
}

export default HMApi;
