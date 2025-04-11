/**
 * Author: Meng
 * Date: 2025-02-21
 * Modify: 2025-02-21
 * Desc:
 */

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import html2canvas from "html2canvas";

import "./index.css";

//
function CaptureView(props, ref) {
  const captureRef = useRef(null);

  useImperativeHandle(ref, () => ({
    capture: handleCapture,
  }));

  function handleCapture() {
    const element = captureRef.current;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);

      if (props.onCapture) {
        props.onCapture(imgData);
      } else {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "capture.png";
        link.click();
      }
    });
  }

  // 画布缩放
  function canvasScale(canvasDiv, viewport) {
    if (canvasDiv) {
      const ctx = canvasDiv.getContext("2d", { willReadFrequently: false });

      const dpr = window.devicePixelRatio || 1;
      const ratio = dpr / 1;
      canvasDiv.width = viewport.width * ratio;
      canvasDiv.height = viewport.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      return ctx;
    }
  }

  return (
    <div className="v-capture3" ref={captureRef}>
      {props.children}
    </div>
  );
}

export default forwardRef(CaptureView);
