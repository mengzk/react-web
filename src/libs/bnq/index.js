/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 与native交互封装
 */
import { BnqToast, BottomPanel } from "mobilecomponet";
import { rnToolV2 } from "web-message-for-rn";
import clipboard from "copy-to-clipboard";

import BnqLottie from "../../components/loading";
import { isInApp, isIOSDevice } from "../../utils/device";
import { downFile } from "../../modules/request/file";
import { onSelectFile } from "../../utils/file";

const inApp = isInApp();
// const isIOS = isIOSDevice();

/**
 * 设置状态栏
 * @param {object} options - 配置项
 * @param {string} options.title - 标题
 * @param {string} options.supportShare - 是否支持分享
 * @param {boolean} options.hideNav - 是否隐藏导航栏
 */
export function setHeaderConfig(options) {
  rnToolV2.sendMsgToRN("customConfig", options);
}
/**
 * 设置标题
 * @param {string} title - 标题
 */
export function updateHeaderTitle(title) {
  rnToolV2.sendMsgToRN("customConfig", { title });
}
/**
 * 显示/隐藏状态栏
 * @param {boolean} hideNav - 是否隐藏导航栏
 */
export function showAppHeader(hideNav) {
  rnToolV2.sendMsgToRN("customConfig", { hideNav });
}
/**
 * 隐藏状态栏
 */
export function hideAppHeader() {
  rnToolV2.sendMsgToRN("customConfig", { hideNav: true });
}

export function onAccountInfo(callback) {
  if (inApp) {
    rnToolV2.getUserInfo("reqLoginInfoV2", (res) => {
      // console.log("---> account", res);
      if (callback && res) {
        callback({
          id: res.id,
          baseCity: res.baseCity,
          avatar: res.avatar,
          email: res.email,
          token: res.token,
          isCrmUser: res.isCrmUser,
          isManager: res.isManager,
          deptPathList: res.deptPathList,
          employeeDto: res.employeeDto,
          phone: res.phone || res.employeeMobile,
          realname: res.realname || res.employeeName,
          username: res.username || res.employeeNumber,
        });
      } else {
        // 获取用户信息失败
        console.warn("---> accountInfo error");
        callback && callback(null);
      }
    });
  }
}
/**
 * 拨打电话
 */
export function onCallPhone(mobile) {
  if (mobile) {
    BnqToast.show({ content: "无效电话号码" });
  } else {
    if (inApp) {
      rnToolV2.sendMsgToRN("telMobile", { mobile });
    } else {
      window.location.href = `tel:${mobile}`;
    }
  }
}

/**
 * 返回上一页
 */
export function onH5Back() {
  if (inApp) {
    rnToolV2.back();
  } else {
    window.history.back();
  }
}

/**
 * 关闭H5页面
 */
export function onH5Close() {
  if (inApp) {
    rnToolV2.back();
  } else {
    // window.history.back();
  }
}

/**
 * 打开审批详情
 * @param {Number} approvalId - 审批详情id
 */
export function toTaskPage(approvalId) {
  if (!approvalId) {
    BnqToast.show({ content: "无效审批ID" });
    return;
  }
  const link = `app://SMApprovalDetail?approvalId=${approvalId}`;
  if (inApp) {
    rnToolV2.push("CarouselPage", { type: "approval", link });
  } else {
    clipboard(link);
    BnqToast.show({ content: "已复制到剪贴板" });
  }
}

/**
 * 打开App
 */
export function onLinkApp(linkUrl) {
  if (!linkUrl) {
    BnqToast.show({ content: "无效链接" });
  } else {
    if (inApp) {
      rnToolV2.sendMsgToRN("LinkingOpen", { linkUrl });
    } else {
      window.location.href = linkUrl;
    }
  }
}

/**
 * 打开小程序
 *  userName: "gh_eb1d",
    path: `pages/wx_file/index`,
    miniProgramType: 1, // 0-正式版 1-开发版 2-体验版
 */
export function openMiniProgram(miniProgramParams) {
  if (inApp) {
    rnToolV2.sendMsgToRN("launchMiniProgram", { miniProgramParams });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 打开地图
 */
export function openMap(longitude, latitude, address) {
  if (inApp) {
    rnToolV2.sendMsgToRN("openNativeMap", { longitude, latitude, address });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 打开设置
 */
export function openSetting() {
  if (inApp) {
    rnToolV2.sendMsgToRN("pushToAppSetting", {});
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 打开相机
 */
export function openCamera(watermarkContent, callback) {
  if (inApp) {
    rnToolV2.sendMsgToRN("openAppCamera2", { watermarkContent }, (res) => {
      if (res?.resultType == -1) {
        BnqToast.show({ content: "相机权限未开启，请手动开启" });
        callback([]);
        return;
      }
      if (res.code == -1) {
        BnqToast.show({ content: "相机权限未开启，请手动开启" });
        callback([]);
      } else {
        callback(res);
      }
    });
  } else {
    console.log("---> openCamera", "请在App内操作！");
    // BnqToast.show({ content: "请在App内操作！" });
    onSelectFile((res) => {
      if (callback) {
        callback(res.all ? res.urls : []);
      }
    });
  }
}

/**
 * 打开视频选择器
 */
export function onTakeVideo(callback) {
  if (inApp) {
    rnToolV2.sendMsgToRN("openCameraVideo", { mediaType: "video" }, (res) => {
      if (!res) {
        BnqToast.show({ content: "拍摄视频出错" });
        callback("");
      } else {
        callback(res);
      }
    });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 播放视频
 */
export function onPlayVideo(url) {
  if (inApp) {
    rnToolV2.sendMsgToRN("onPlayVideo", { url }, (res) => {});
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 打开相册
 */
export function openPhotoPicker(multiple, maxFiles, callback) {
  if (inApp) {
    // const key = watermark ? "watermarkImg" : "openAppAlbum2";
    rnToolV2.sendMsgToRN("openAppAlbum2", { multiple, maxFiles }, (res) => {
      if (res?.resultType == -1) {
        BnqToast.show({ content: "相册权限未开启，请手动开启" });
        callback([]);
        return;
      }
      if (res.code == -1) {
        BnqToast.show({ content: "相册权限未开启，请手动开启" });
        callback([]);
      } else {
        callback(res);
      }
    });
  } else {
    console.log("---> openPhotoPicker", "请在App内操作！");
    // BnqToast.show({ content: "请在App内操作！" });
    onSelectFile((res) => {
      if (callback) {
        callback(res.all ? res.urls : []);
      }
    });
  }
}

/**
 * 打开水印相册
 */
export function onWatermarkImg(multiple, maxFiles, callback) {
  if (inApp) {
    rnToolV2.sendMsgToRN("watermarkImg", { multiple, maxFiles }, (res) => {
      if (res?.resultType == -1) {
        BnqToast.show({ content: "相册权限未开启，请手动开启" });
        callback([]);
        return;
      }
      if (res.code == -1) {
        BnqToast.show({ content: "相册权限未开启，请手动开启" });
        callback([]);
      } else {
        callback(res);
      }
    });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 打开文件选择器
 * fileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'image']
 */
export function openFilePicker(fileTypes, callback) {
  if (inApp) {
    rnToolV2.sendMsgToRN("selectFile", { fileTypes }, (res) => {
      if (!res) {
        BnqToast.show({ content: "文件权限未开启，请手动开启" });
        callback([]);
      } else {
        console.log("---> openFilePicker", res);
        let url = res.uri || "";
        let name = res.name || url.substring(url.lastIndexOf("/") + 1);
        let size = res.size || 0;
        let fileType = res.type || fromNameGetType(name);

        if (!fileTypes.some((e) => e === fileType)) {
          BnqToast.show({ content: "不支持的文件类型" });
          callback([]);
          return;
        }
        if (size > 100485760) {
          BnqToast.show({ content: "文件大小不能超过100MB" });
          callback([]);
          return;
        } else {
          rnToolV2.sendMsgToRN("uploadFiles", { filepaths: [url] }, (res2) => {
            console.log("---> uploadFiles", res2);
            if (res2 && res2.length > 0) {
              const list = res2.map((e) => {
                return { url: e, name, type: fileType };
              });
              callback(list);
            } else {
              BnqToast.show({ content: "文件上传失败，请检查您的网络" });
              callback([]);
            }
          });
        }
      }
    });
  } else {
    console.log("---> uploadFiles", "请在App内操作！");
    // BnqToast.show({ content: "请在App内操作！" });
    onSelectFile((res) => {
      if (callback) {
        callback(res.all ? res.urls : []);
      }
    });
  }
}

/**
 * 文件类型
 */
export function fromNameGetType(name = " . ") {
  let fileType = name.split(".").pop().toLowerCase();
  // console.log(fileType)
  switch (fileType) {
    case "mp4":
    case "avi":
    case "mov":
      fileType = "video";
      break;
    case "pdf":
      fileType = "pdf";
      break;
    case "doc":
    case "docx":
      fileType = "word";
      break;
    case "xls":
    case "xlsx":
      fileType = "excel";
      break;
    case "ppt":
    case "pptx":
      fileType = "ppt";
      break;
    case "jpg":
    case "jpeg":
    case "png":
    case "apng":
    case "pjpeg":
    case "gif":
      fileType = "image";
      break;
    case "cad":
    case "dwg":
      fileType = "cad";
      break;
    default:
      fileType = "file";
      break;
  }

  return fileType;
}

/**
 * 时间选择器
 */
export function openDatePicker(callback) {
  if (inApp) {
    rnToolV2.sendMsgToRN("showDateAndTimePicker", {}, (res) => {
      if (res && res.code == 0) {
        if (callback) {
          callback(res);
        }
      } else {
        BnqToast.show({ content: "获取时间失败" });
      }
    });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 申请定位权限
 */
export function applyLocationPermission() {
  return new Promise((resolve) => {
    if (inApp) {
      rnToolV2.sendMsgToRN("checkAndRequestLocationPermission", {}, (res) => {
        const { result } = res || {};
        resolve(result);
      });
    } else {
      BnqToast.show({ content: "请在App内操作！" });
      resolve(true);
    }
  });
}

/**
 * 获取精确位置
 */
export async function onGetLocation(callback) {
  const permission = await applyLocationPermission();
  if (!permission) {
    BnqToast.show({ content: "您已拒绝定位权限, 请手动开启！" });
    callback(null);
    return;
  }
  if (inApp) {
    rnToolV2.sendMsgToRN("GetGaodeLocationV2", {}, (res) => {
      const { longitude, latitude } = res || {};
      if (longitude && latitude) {
        if (callback) {
          callback(res);
        }
      } else {
        BnqToast.show({ content: "获取位置失败，请开启定位或检查网络" });
        callback(null);
      }
    });
  } else {
    BnqToast.show({ content: "请在App内操作！" });
    callback(null);
  }
}

/**
 * 分享
 *  copyUrl: 'https://asdad', // 分享的链接，默认使用当前网页地址
    miniProgramId: 'wxa75c635d', //小程序原始ID 非必填需要分享小程序需要传递
    miniProgramPageUrl: 'pages/index', //小程序页面 非必填需要分享小程序需要传递
    isFriendNeedMiniProgram: false, // 分享微信是否是需要小程序
    isFriendCircleNeedMinProgram: false, // 分享朋友圈是否是需要小程序
    withoutShareBoard: false, // 如果为true，不弹出分享面板，直接调用分享
    shareChannel: [1, 100], // 分享面板的分享渠道 数组可包含 分享的类型 1,微信 100,复制链接 101分享
    path: 'pages/index/index', //小程序页面 非必填需要分享小程序需要传递
    description: '你有一个百安居任务，请及时处理',
    img: 'https://dhstatic.btho',
    appId: 'gh_2002',
    title: '有一个任务，请及时处理',
    mode: 'mini',
    version: env == 'test' ? 2 : 0, // 正式版:0，测试版:1，体验版:2
 */
export function onAppShare(options) {
  if (inApp) {
    rnToolV2.sendMsgToRN("share", options);
  } else {
    BnqToast.show({ content: "请在App内操作！" });
  }
}

/**
 * 分享
 */
export function onShareImage(url, platform) {
  if (inApp) {
    rnToolV2.sendMsgToRN("shareThirdImage", { url: imageUrl, platform });
  } else {
    clipboard(url);
    BnqToast.show({ content: "已复制到剪贴板" });
  }
}

/**
 * 分享 -文本
 */
export function onShareText(text) {
  if (inApp) {
    rnToolV2.sendMsgToRN("shareThirdText", { text, platform: "wx" });
  } else {
    clipboard(text);
    BnqToast.show({ content: "已复制到剪贴板" });
  }
}
/**
 * 分享 -文件
 */
export function onShareFile(fileUrl, title, channel) {
  // console.log("---> share", new URL(fileUrl));
  if (inApp) {
    BottomPanel.share({
      channel: channel || ["workWechat", "link"],
      onPress: ({ action }) => {
        console.log("---> share", action);
        if (action == "cancel") {
          return;
        }
        if (action != "link") {
          BnqLottie.onShow("分享中...");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            BnqLottie.onHide();
          }, 3000);
          // const url2 = new URL(fileUrl);
          rnToolV2.sendMsgToRN(
            "shareThirdFile",
            {
              fileUrl,
              title,
              channel: action,
            },
            (e) => {
              console.log("---> shareThirdFile", e);
              if (e.code) {
                if (typeof e.msg == "object") {
                  const obj = e.msg;
                  BnqToast.show({ content: `${e.code}, ${obj.message}` });
                } else {
                  BnqToast.show({ content: e.msg });
                }
              }
            }
          );
        } else {
          clipboard(fileUrl);
          BnqToast.show({ content: "已复制到剪贴板" });
        }
      },
    });
  } else {
    clipboard(fileUrl);
    BnqToast.show({ content: "已复制到剪贴板" });
  }
}
/**
 * 下载文件
 * @param {*} url
 * @param {*} name
 * @param {*} callback
 */
export function onDownFile(url, name, callback) {
  if (url) {
    if (inApp) {
      BnqLottie.onShow("下载中...");
      const fileName = name || url.split("/").pop();
      const url2 = new URL(url);
      console.log("---> shareThirdFile", url2);
      rnToolV2.sendMsgToRN(
        "downFile",
        { fileUrl: url2.href, fileName },
        (res) => {
          console.log("---> downFile", res);
          BnqLottie.onHide();
          if (res.status < 0) {
            BnqToast.show({ content: "下载失败" });
            if (callback) {
              callback(null);
            }
          } else {
            if (callback) {
              callback(res);
            }
          }
        }
      );
    } else {
      const fileName = name || url.split("/").pop();
      downFile(url, fileName);
      if (callback) {
        callback({ code: 0 });
      }
    }
  } else {
    BnqToast.show({ content: "文件地址为空" });
    if (callback) {
      callback(null);
    }
  }
}
