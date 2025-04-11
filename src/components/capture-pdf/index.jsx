/**
 * Author: Meng
 * Date: 2025-02-21
 * Modify: 2025-02-21
 * Desc:
 */

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./index.css";

let PDFWidth = 762; // pdf纸张大小
let PDFHeight = 1078; // pdf纸张大小
const VGap = 40; // pdf内边距

// 生成PDF
const CapturePDF = (props, ref) => {
  const captureRef = useRef(null);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (props.width && props.height) {
      PDFWidth = props.width;
      PDFHeight = props.height;

      // 缩放 到屏幕宽度
      const scale = document.documentElement.clientWidth / PDFWidth;
      const transform = `scale(${scale})`;
      setStyles({
        width: props.width,
        transform,
        transformOrigin: "left top",
      });
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onCreate,
    }),
    []
  );

  function onCreate(name = "", text = "") {
    const element = captureRef.current;

    let width = element.offsetWidth || 10;
    let height = element.offsetHeight || 10;
    const s = Math.round((PDFWidth / width) * 1000) / 1000;
    const VGH = Math.round((VGap / s) * 1000) / 1000;
    const paperHeight = Math.round((PDFHeight / s) * 1000) / 1000;

    console.log("---> div", width, height, s, VGH);
    let paperNum = 1;
    let paperTotal = Math.ceil(height / paperHeight);
    const newHeight = height + (paperTotal + 1) * 2 * VGH;
    paperTotal = Math.ceil(newHeight / paperHeight);
    console.log("---> paper total", paperTotal, height, newHeight, paperHeight);

    renderHeader(element, element.children[0], VGH); // 页眉
    if (height > paperHeight) {
      let pageTab = null;
      let position = 0;
      while (position < element.children.length && position < 3000) {
        const child = element.children[position];
        const childHeight = child.offsetHeight || 1;
        // console.log("---> child", position, childHeight, child.offsetTop);
        const H = paperNum * paperHeight - (child.offsetTop + VGH);
        if (H >= 0 && H < childHeight) {
          // console.log("---> position", SH, child.offsetTop);
          const footer = `${paperNum} / ${paperTotal}`;
          renderFooter(element, child, VGH, H, footer, false); // 页脚
          renderHeader(element, child, VGH); // 页眉
          if (pageTab) {
            renderTab(element, child, pageTab);
          }
          paperNum += 1;
        }
        if (child.id.indexOf("pdf-th-") > -1) {
          pageTab = child;
        }
        position++;
      }
    }
    const child3 = element.children[element.children.length - 1];
    const lastEleH = child3.offsetTop + child3.offsetHeight;
    let H = paperNum * paperHeight - lastEleH - VGH - 1;
    console.log("---> last", paperTotal, paperNum);
    if (paperTotal >= paperNum) {
      renderFooter(
        element,
        child3,
        VGH,
        H,
        `${paperNum} / ${paperTotal}`,
        true
      );
    }

    // 水印
    if (text) {
      renderWatermark(element, text, paperTotal * paperHeight / 100);
    }

    html2canvas(element).then((canvas) => {
      width = element.offsetWidth || 10;
      height = element.offsetHeight || 10;
      const imgData = canvas.toDataURL("image/png", 1.0);
      onCreatePDF(imgData, width, height, s);
    });
  }

  function onCreatePDF(imgData, width, height, scale) {
    const boxWidth = width * scale;
    const boxHeight = height * scale;
    // console.log("---> img", width, height, scale);

    const pdf = new jsPDF({
      orientation: "p", //
      unit: "px",
      format: [PDFWidth, PDFHeight],
      compress: true,
    });
    if (boxHeight > PDFHeight) {
      let position = 0;
      let remainHeight = boxHeight;
      while (remainHeight >= 0) {
        pdf.addImage(imgData, "PNG", 0, position, boxWidth, boxHeight);
        position -= PDFHeight;
        remainHeight -= PDFHeight;
        if (remainHeight > 0) {
          pdf.addPage();
        }
      }
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, boxWidth, height * scale);
    }
    // pdf.save("capture.pdf");
    // 生成文件流
    const pdfBlob = pdf.output("blob");
    // saveAs(pdfBlob, "capture.pdf");

    if (props.onCapture) {
      props.onCapture(pdfBlob);
    }
  }

  // 页眉
  function renderHeader(element, child, height) {
    const headerEle = document.createElement("div");
    headerEle.style.height = `${height}px`;
    headerEle.className = "v-capture-pdf-header";
    element.insertBefore(headerEle, child);
  }

  // 页签
  function renderTab(element, child, tab) {
    const headerEle = tab.cloneNode(true);
    element.insertBefore(headerEle, child);
  }

  // 页脚
  function renderFooter(element, child, FH, EH, text, isEnd = false) {
    const eEle = document.createElement("div");
    eEle.style.height = `${EH}px`;
    eEle.style.width = "1px";

    // 页脚
    const footerEle = document.createElement("div");
    footerEle.style.height = `${FH}px`;
    footerEle.className = "v-capture-pdf-footer";
    footerEle.innerHTML = text;

    if (isEnd) {
      element.appendChild(eEle);
      element.appendChild(footerEle);
    } else {
      element.insertBefore(eEle, child);
      element.insertBefore(footerEle, child);
    }
  }

  // 水印
  function renderWatermark(element, text, num) {
    console.log("---> watermark", text, num);
    const watermarkEle = document.createElement("div");
    watermarkEle.className = "v-capture-pdf-watermark";
    watermarkEle.style.width = element.offsetWidth + "px";
    for (let i = 0; i < num; i++) {
      const span = document.createElement("span");
      span.className = "v-capture-pdf-watermark-item";
      span.innerHTML = text;
      watermarkEle.appendChild(span);
    }
    //
    element.appendChild(watermarkEle);
  }

  return (
    <div className="v-capture-pdf-content" ref={captureRef} style={styles}>
      {props.children}
    </div>
  );
};

export default forwardRef(CapturePDF);
