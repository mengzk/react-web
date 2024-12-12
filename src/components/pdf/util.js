/**
 * Author: Meng
 * Date: 2024-12-12
 * Modify: 2024-12-12
 * Desc:
 */

export function canvasScale(canvasDiv, viewport) {
  if (canvasDiv) {
    const ctx = canvasDiv.getContext("2d", { willReadFrequently: false });

    const dpr = window.devicePixelRatio || 1;
    const ratio = dpr / 1;
    canvasDiv.width = viewport.width * ratio;
    canvasDiv.height = viewport.height * ratio;
    // canvas.style.width = viewport.width + "px"
    // canvas.style.height = viewport.height + "px"
    // console.log("---> scale:", ratio, viewport.width, viewport.height);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return ctx;
  }
}

export function getPageList(num, len) {
  let list = [];
  for (let i = -len; i <= len; i++) {
    list.push(num + i);
  }
  // console.log("---> getPageList:", list);
  return list;
}

export function isLoad(num, curNum) {
  return Math.abs(curNum - num) < 2;
}