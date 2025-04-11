/**
 * Author: Meng
 * Date: 2025-03-03
 * Modify: 2025-03-03
 * Desc:
 */

import lottie from "lottie-web";
import loadingJson from "./lottie";
import "./index.less";

let isLoading = false;
let loadElem = null;
let loadTextElem = null;
// 初始化加载动画
function initLottie(text) {
  const loadingBox = document.createElement("div");
  loadingBox.className = "v-lottie-loading";

  const contentBox = document.createElement("div");
  contentBox.className = "content-box";

  contentBox.onclick = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  const lottieBox = document.createElement("div");
  lottieBox.className = "lottie-box";

  contentBox.appendChild(lottieBox);
  // if (text) {
  //   loadTextElem = document.createElement("div");
  //   loadTextElem.className = "loading-text";
  //   loadTextElem.innerText = text; // || "加载中...";
  //   contentBox.appendChild(loadTextElem);
  // }
  loadingBox.appendChild(contentBox);
  document.body.appendChild(loadingBox);
  loadElem = loadingBox;
  try {
    lottie.loadAnimation({
      container: lottieBox,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingJson,
    });
    // lottie.setSpeed(3);
  } catch (err) {
    console.error("---> lottie err", err);
  }
}

// 显示加载动画
function onShow(text) {
  if (!isLoading) {
    isLoading = true;
    lottie.play();
    if (loadElem) {
      // if(text) {
      //   loadTextElem.innerText = text; // || "加载中...";
      // }
      loadElem.style.width = "100vw";
      loadElem.style.height = "100vh";
      loadElem.style.display = "flex";
    } else {
      initLottie(text);
    }
  }
}

// 隐藏加载动画
function onHide() {
  if (isLoading) {
    isLoading = false;
    lottie.stop();
    // lottie.destroy();
    if (loadElem) {
      loadElem.style.width = "0";
      loadElem.style.height = "0";
      loadElem.style.display = "none";
    }
  }
}

const BnqLottie = {
  onShow,
  onHide,
};

export default BnqLottie;
