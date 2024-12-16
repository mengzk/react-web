/**
 * Author: Meng
 * Date: 2024-12-12
 * Modify: 2024-12-12
 * Desc:
 */
import React, { useState, useEffect, useRef } from "react";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";

import { canvasScale, getPageList } from "./util";
import "./index.css";

const loopSize = 2; //
let loopPosition = 0; //
let isLoop = true; //
let lastScrollY = 0; //
let loopTimer = 0; //
let scrollTimer = 0; //
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
      }, 300);
    } catch (err) {
      console.warn("---> init pdf error:", err);
      setStatue(1);
    }
  }

  async function startRender(loadRes) {
    scrollListener(loadRes);
    rendList = getPageList(3, 2);
    await renderDocs(loadRes, 0, rendList);
    loopRender(loadRes, 6, false, 3600);
  }

  function scrollListener(loadRes) {
    if (pdfRef.current) {
      pdfRef.current.addEventListener("scroll", (e) => {
        const { scrollTop } = e.target;
        if(Math.abs(scrollTop - lastScrollY) < 300){}
        isLoop = false;
        if (loopTimer) {
          clearTimeout(loopTimer);
          loopTimer = 0;
        }
        if (scrollTimer) {
          clearTimeout(scrollTimer);
          scrollTimer = 0;
        }
        scrollTimer = setTimeout(() => {
          clearTimeout(scrollTimer);
          onScrollEnd(loadRes, e);
        }, 300);
      });
    }
  }

  async function onScrollEnd(loadRes, e) {
    const { scrollTop, scrollHeight } = e.target;
    let total = pageNum.current;
    const pageHeight = scrollHeight / total;
    let isUp = scrollTop < lastScrollY;
    let position = 1;
    if (scrollTop > pageHeight) {
      position = Math.ceil(scrollTop / pageHeight) + 1;
    }
    lastScrollY = scrollTop;
    // console.log("---> scrollTop:",scrollHeight, scrollTop, pageHeight, position);
    if (position > 0 && position < total && position != curNum) {
      setCurNum(position);
      rendList = getPageList(position, loopSize);
      await renderDocs(loadRes, 0, rendList);
      isLoop = true;
      let nextIdx = position + (loopSize + 1) * (isUp ? -1 : 1);
      loopRender(loadRes, nextIdx, isUp, 10);
    }
  }

  function loopRender(loadRes, num, order, time=3600) {
    if (isLoop) {
      if(loopPosition === num){
        return;
      }
      if (loopTimer) {
        clearTimeout(loopTimer);
      }
      loopPosition = num;
      loopTimer = setTimeout(() => {
        clearTimeout(loopTimer);
        console.log("---> loopRender:", num);
        const loads = renderedList.current;
        let idx = loads.indexOf(num);
        let list = pageList.current.filter((e) => !loads.includes(e));
        if (list.length > 0) {
          if (list.length > 3) {
            // 处理加载优先级
            idx = list.indexOf(num); // 当前页位置
            if (num > list[0] && idx > 0) {
              list = list.slice(idx, idx + 3);
            } else {
              list = list.slice(0, 3);
            }
          }
          // console.log("---> loopRender list:", idx, list);
          let nextIdx = order ? list[0] : list[list.length - 1];
          nextIdx += order ? -1 : 1;
          renderDocs(loadRes, 0, list).finally(() => {
            loopRender(loadRes, nextIdx, order, 3600);
          });
        }
      }, time);
    }
  }

  async function renderDocs(loadRes, index, list) {
    await renderPage(loadRes, list[index]);
    if (index < list.length - 1) {
      renderDocs(loadRes, index + 1, list);
    } else {
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
        if (renderedList.current.includes(num)) {
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

  function loadView() {
    if (inited) {
      return <></>;
    }
    if (props.loadView) {
      return props.loadView();
    }
    return <div className="v-pdf-loading">加载中...</div>;
  }

  function errView() {
    if (statue === 1) {
      if (props.errView) {
        return props.errView();
      }
      return <div className="v-pdf-empty">加载失败！</div>;
    } else if (statue === 2) {
      if (props.emptyView) {
        return props.emptyView();
      }
      return <div className="v-pdf-empty">暂无资料</div>;
    } else {
      return <></>;
    }
  }

  function pageLoadView(show) {
    if (show) {
      return <></>;
    }
    if (props.pageLoadView) {
      return props.pageLoadView();
    }
    return <div className="v-pdf-page-load">加载中...</div>;
  }

  function pageView(num) {
    const loaded = renderedList.current.includes(num);
    return (
      <div key={num} className="v-pdf-page" id={`pdf-page-${num}`}>
        <canvas id={`pdf-canvas-${num}`}></canvas>
        {pageLoadView(loaded)}
      </div>
    );
  }

  return (
    <div ref={pdfRef} className="v-pdf-view">
      {pageList.current.map(pageView)}
      {loadView()}
      {errView()}
    </div>
  );
}

export default PDFView;
