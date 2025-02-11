/*
 * Author: Meng
 * Create: YEAR-MONTH-DAY
 * Modify: YEAR-MONTH-DAY
 * Desc:
 */

import loadIc from "../../assets/icon/logo.png";

class Loading {
  static __child = null;

  static show() {
    if (Loading.__child) {
      return;
    }
    
    const div = document.getElementById("alert");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    div.style.display = "flex";
    const box = document.createElement("div");
    box.className = "loading-box";

    const img = document.createElement("img");
    img.className = "loading-img";
    img.src = loadIc;
    box.appendChild(img);

    const span = document.createElement("span");
    span.innerText = "加载中...";
    box.appendChild(span);

    div.appendChild(box);
    Loading.__child = box;
  }

  static hide() {
    const div = document.getElementById("alert");
    if (Loading.__child) {
      div.appendChild(Loading.__child);
      Loading.__child = null;
    }
    div.style.display = "none";
  }
}

export default Loading;
