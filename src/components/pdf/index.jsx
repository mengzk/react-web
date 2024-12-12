/**
 * Author: Meng
 * Date: 2024-12-12
 * Modify: 2024-12-12
 * Desc:
 */
import React, { useState, useEffect, useRef } from "react";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
import * as PDFWorker from "pdfjs-dist/legacy/build/pdf.worker";

import { canvasScale, getPageList } from "./util";
import "./index.css";

let looper = true; //
let scrollTimeout = 0; //
let rendList = []; //

function PDFView(props) {
  const pageNum = useRef(0);
  const pdfRef = useRef(null);
  const renderedList = useRef([]);
  const pageList = useRef([]);
  const [statue, setStatue] = useState(0);
  const [inited, setInited] = useState(false);
  const [curNum, setCurNum] = useState(1);

  useEffect(() => {
    // rendList = [1, 2, 3, 4, 5];
    initPdf(props.url);
  }, []);

  async function initPdf(path = "") {
    try {
      const loadingTask = PDFJS.getDocument(path);
      const loadRes = await loadingTask.promise;

      const total = loadRes.numPages;
      pageList.current = Array.from({ length: total }, (_, k) => k + 1);
      pageNum.current = total;
      setInited(true);
      // console.log("---> pdf num:", total, list);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        startRender(loadRes);
      }, 600);
    } catch (err) {
      console.warn("---> init pdf error:", err);
      setStatue(1);
    }
  }

  async function startRender(loadRes) {
    scrollListener(loadRes);
    rendList = getPageList(3, 3);
    await renderDocs(loadRes, 0, rendList);
    loopRender(loadRes, 5);
  }

  function scrollListener(loadRes) {
    if (pdfRef.current) {
      pdfRef.current.addEventListener("scroll", (e) => {
        looper = false;
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
          clearTimeout(scrollTimeout);
          onScrollEnd(loadRes, e);
        }, 200);
      });
    }
  }

  async function onScrollEnd(loadRes, e) {
    const { scrollTop, scrollHeight,  } = e.target;
    let total = pageNum.current;
    const pageHeight = scrollHeight / total;
    let num3 = 1;
    if (scrollTop > pageHeight) {
      num3 = Math.ceil(scrollTop / pageHeight) + 1;
    }
    // console.log("---> scrollTop:",scrollHeight, scrollTop, pageHeight, num3);
    if (num3 > 0 && num3 < total && num3 != curNum) {
      setCurNum(num3);

      rendList = getPageList(num3, 2);
      await renderDocs(loadRes, 0, rendList);
      looper = true;
      loopRender(loadRes, num3+2);
    }
  }

  function loopRender(loadRes, num) {
    if(looper) {
      const loads = renderedList.current;
      let list = pageList.current.filter(e => !loads.includes(e));
      // console.log("---> loopRender:", list, loads);
      if(list.length > 0) {
        if(list.length > 3) {
          // 处理加载优先级
          const idx = list.indexOf(num); // 当前页
          if(num > list[0] && idx > 0) {
            list = list.slice(idx, idx+3);
          }else {
            list = list.slice(0, 3);
          }
        }
        renderDocs(loadRes, 0, list).finally(() => {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            loopRender(loadRes, num + 3);
          }, 6000);
        });
      }
    }
  }

  async function renderDocs(loadRes, index, list) {
    await renderPage(loadRes, list[index]);
    if (index < list.length - 1) {
      renderDocs(loadRes, index + 1, list);
    }else {
      return;
    }
  }

  async function renderPage(loadRes, num) {
    try {
      const total = pageNum.current;
      if (num < 0 || num > total) {
        console.log("---> page more than:", num);
      } else {
        // console.log("------> renderPage:", num);
        if(renderedList.current.includes(num)) {
          return;
        }
        const page = await loadRes.getPage(num);
        // page.cleanup();
        const viewport = page.getViewport({ scale: 1 });
        const canvasDiv = document.getElementById(`pdf-canvas-${num}`);

        if (canvasDiv) {
          const context = canvasScale(canvasDiv, viewport);
          const renderContext = { canvasContext: context, viewport: viewport };
          
          renderedList.current.push(num);
          setStatue(Date.now());
          await page.render(renderContext).promise;

          // const ch = canvasDiv.offsetHeight || 0;
          // // 设置预设高度
          // if (!inited.current && num == 1) {
          //   inited.current = true;
          //   for (let i = 1; i <= total; i++) {
          //     const pageDiv = document.getElementById(`pdf-page-${i}`);
          //     if (pageDiv) {
          //       pageDiv.style.height = `${ch}px`;
          //     }
          //   }
          // }
        }
      }
    } catch (error) {
      console.warn("---> render error:", num, error);
    }
    return;
  }

  function pageView(num) {
    const loaded = renderedList.current.includes(num);
    return (
      <div key={num} className="v-pdf-page" id={`pdf-page-${num}`}>
        <canvas id={`pdf-canvas-${num}`}></canvas>
        {loaded ? <></>:<div className="v-pdf-page-load">加载中...</div>}
      </div>
    );
  }

  return (
    <div ref={pdfRef} className="v-pdf-view">
      {pageList.current.map(pageView)}
      {inited ? <></> : <div className="v-pdf-loading">加载中...</div>}
      {statue == 1 ? <div className="v-pdf-empty">加载失败！</div>:<></>}
      {/* <div className="v-pdf-page-num">
        {curNum}/{pageNum.current}
      </div> */}
    </div>
  );
}

export default PDFView;
