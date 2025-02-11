/**
 * Author: Meng
 * Date: 2025-01-09
 * Modify: 2025-01-09
 * Desc:
 */

/**
 * 弹窗
 */
function modal(child) {
  if(!child) {
    return;
  }
  const body = document.body;
  const root = document.createElement("div");
  root.id = "modal";
  root.style.position = "fixed";
  root.style.top = 0;
  root.style.left = 0;
  root.style.zIndex = 9993;
  root.style.width = "100vw";
  root.style.height = "100vh";
  root.style.display = "flex";
  root.style.backgroundColor = "rgba(0,0,0,0.5)";
  root.style.animation = "fade 1s";

  const modal = document.createElement("div");
  modal.style.width = "300px";
  modal.style.height = "200px";
  modal.style.padding = "20px";
  modal.style.borderRadius = "16px";
  modal.style.display = "flex";
  modal.style.backgroundColor = "#fff";

  modal.appendChild(child);

  root.appendChild(modal);

  body.appendChild(root);
}

/**
 * 移除
 */
function remove() {
  const root = document.getElementById("modal");
  if(root) {
    root.style.animation = "fadeOut 1s";
    const timer = setTimeout(() => {
      clearTimeout(timer);
      root.remove();
    }, 1000);
  }
}
