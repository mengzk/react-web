/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 初始化 登录启动项
 */
import { useEffect, useState } from "react";

import { getPageQuery } from "../utils/index";
import { platformName, isInApp } from "../utils/device";
import { base64Encode } from "../utils/encrypt";
import { onAccountInfo } from "../libs/bnq";
import Constants from "../config/consts";
import Session from "../stores/session";
import bgImg from "../assets/img/body_bg.png";

function useLaunch() {
  const [inited, setInited] = useState(false);

  useEffect(() => startup(), []);

  // 启动校验函数
  const startup = () => {
    const query = getPageQuery();
    const platform = platformName();
    const inApp = isInApp();
    console.log(`---> platform: ${platform}, bnqApp: ${inApp}`);
    // 设置背景图片 -可根据 scene 设置不同背景
    window.document.body.style.backgroundImage = `url(${bgImg})`;

    if (platform === "web") {
      // 启动动画
      const timer = setTimeout(() => {
        clearTimeout(timer);
        setInited(true);
      }, 600);
    } else {
      let token = null;
      // 获取设备信息 -用户信息
      if (query.token) {
        token = query.token;
      } else if (inApp) {
        onAccountInfo((res) => parseScene(query.scene, res));
        return;
      } else {
        // 未在App内 获取token -
        // token = base64Encode("10004436"); // ERP 测试账号数据
        token = Session.getData("token");
      }
      Constants.token = token;

      console.log("token:", token);

      Session.setData("token", token);
      setInited(true);
    }
  };

  // 根据场景 解析用户信息
  function parseScene(scene, res) {
    let token = null;
    if (scene == "bimerp") {
      token = base64Encode(res.username);
    } else {
      token = res.token;
    }
    Constants.token = token;
    Session.setData("token", token);
    Session.setData("userInfo", res);
    setInited(true);
  }

  return { inited };
}

export default useLaunch;
