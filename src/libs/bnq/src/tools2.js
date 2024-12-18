/**
 * Author:
 * Date: 2023-03-09
 * Desc: 第二版
 */

import Bus from "./bus";
import { postMessage, hmDevice } from "./emitter";
import Tools from "./tools";
import { methodMap } from "./rnToHm";

let toolV2Option = null;

class RNTool2 {
  /**
   * 添加配置 -解析数据函数
   * @param option
   */
  static setConfig(option) {
    toolV2Option = option;
  }

  // 可用于处理返回数据
  static formatData(data) {
    // console.log(data);
    if (toolV2Option) {
      return toolV2Option.dataFormat(data);
    }
    return data;
  }

  static initRNListener(callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool2._postMessageToRN(
        "AppState-listener",
        "RNAppState",
        null,
        callback
      );
    }
  }

  /**
   * 添加原生navbar的点击事件监听
   * @param eventType
   */
  static addClickListener(eventType, callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      Bus.add(`${eventType}-listener`, callback, eventType, 2);
    }
  }

  static addListener(eventType, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.listener({ key: eventType }, callback);
    } else {
      RNTool2._postMessageToRN(
        `${eventType}-listener`,
        "listener",
        { type: eventType },
        callback
      );
    }
  }

  static emit(eventType, params) {
    const hm = hmDevice();
    if (hm) {
      Tools.emit({ event: eventType, data: params });
    } else {
      RNTool2.sendMsgToRN("h5EmitToRN", { eventType, params });
    }
  }

  /**
   * modelName  在RN客户端中会根据modelName来进行具体的业务操作
   *  其中object：{params:{},id:string,type:'',callback:func}
   */
  static sendMsgToRN(key, params, callback) {
    const hm = hmDevice();
    if (hm) {
      let event = methodMap[key];
      if (!event) {
        event = key;
      }
      Tools.invoke(event, params, callback);
    } else {
      let id = `${key}-${Date.now()}`;
      RNTool2._postMessageToRN(id, key, params, callback);
    }
  }

  /**
   * modelName  在RN客户端中会根据modelName来进行具体的业务操作
   *  其中为了兼容v1版本object：{data:object, id:string, key:string, callback: (res: any) => {}}
   */
  static postMessageToRN(requestId, key, data, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.listener({ key, data }, callback);
    } else {
      RNTool2._postMessageToRN(requestId, key, data, callback);
    }
  }

  /**
   * modelName  在RN客户端中会根据modelName来进行具体的业务操作
   *  其中为了兼容v1版本object：{data:object, id:string, key:string, callback: (res: any) => {}}
   */
  static _postMessageToRN(requestId, key, data, callback) {
    const callNotNull = callback != null;
    postMessage({ requestId, key, data, bridgev: "v2" })
      .then((res) => {
        if (callNotNull) {
          callback(RNTool2.formatData(res));
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

  /**
   *
   * @param routeName
   * @param {*} param  {routeName:'',param}
   */
  static push(routeName, param, callback) {
    const hm = hmDevice();
    if (hm) {
      switch (routeName) {
        case "QRCodePage":
          Tools.qrcodeScan();
          break;
        default:
          Tools.push(param);
          break;
      }
    } else {
      RNTool2.sendMsgToRN("push", { pname: routeName, param }, callback);
    }
  }

  static replace(routeName, param, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.replace(param);
    } else {
      RNTool2.sendMsgToRN("replace", { param, pname: routeName }, callback);
    }
  }

  static back(message) {
    const hm = hmDevice();
    if (hm) {
      Tools.back();
    } else {
      RNTool2.sendMsgToRN("back", message, null);
    }
  }

  ////////////// 提供扩展功能 //////////////

  //获取上一个页面传递过来的参数
  static getInitData(callback) {
    const hm = hmDevice();
    if (hm) {
    } else {
      RNTool2.sendMsgToRN("webInitData", {}, callback);
    }
  }

  //修改app原生标题栏
  static setNavbar(navbar, rights) {
    const hm = hmDevice();
    if (hm) {
      Tools.headerConfig({ actions: rights });
    } else {
      RNTool2.sendMsgToRN("setNavbar", { navbar, rights });
    }
  }

  static setTitle(title) {
    const hm = hmDevice();
    if (hm) {
      Tools.headerConfig({ title });
    } else {
      RNTool2.sendMsgToRN("setTitle", { title });
    }
  }

  /**
   * 获取用户信息
   * @param message
   * @param callback
   */
  static getUserInfo(message, callback) {
    const hm = hmDevice();
    if (hm) {
      Tools.userInfo(message, callback);
    } else {
      RNTool2.sendMsgToRN("reqLoginInfoV2", message, callback);
    }
  }

  // 重新加载url
  static reloadWebpage() {
    const hm = hmDevice();
    if (hm) {
      Tools.reload();
    } else {
      RNTool2.sendMsgToRN("reload");
    }
  }
}

export default RNTool2;
