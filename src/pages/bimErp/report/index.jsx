/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 * http://192.168.243.227:8067/bimerp/report?word=&token=MTAwMDYwMzg=
 */

import React, { useState, useEffect, useRef } from "react";
import { BnqToast } from "mobilecomponet";
import Header from "../../../components/header/index";
import CapturePDF from "../../../components/capture-pdf/index";
import BnqLottie from "../../../components/loading";

import { getPackageConfigData } from "../../../apis/erp";
import { onUploadFile } from "../../../apis/file";
import { onDownFile, onShareFile, setHeaderConfig } from "../../../libs/bnq";
import { getPageQuery } from "../../../utils";

import downIc from "../../../assets/icon/down_b.png";
import shareIc from "../../../assets/icon/share_b.png";
import cf from "../../../assets/icon/tl_cf.png";
import kt from "../../../assets/icon/tl_kt.png";
import qw from "../../../assets/icon/tl_qw.png";
import sf from "../../../assets/icon/tl_sf.png";
import ws from "../../../assets/icon/tl_ws.png";
import wsj from "../../../assets/icon/tl_wsj.png";

import "./index.less";

const PDFWidth = 762; // pdf纸张大小
const PDFHeight = 1078; // pdf纸张大小

let fileName = "谈单手册.pdf";
let downAction = false;
//
function ERPReport(props) {
  const pdfRef = useRef(null);
  const pdfUrl = useRef("");
  const [title, setTitle] = useState("");
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setHeaderConfig({ hideNav: true });

    getPdfData();
  }, []);

  async function getPdfData() {
    const query = getPageQuery();
    const params = {
      currentPage: 1,
      pageSize: 10,
      selectType: 2,
      tabId: "config",
    };
    if (query.setNo) {
      params.setNo = query.setNo;
    }
    if (query.shopCode) {
      params.shopCode = query.shopCode;
    }
    if (query.protuctType) {
      params.protuctType = query.protuctType;
    }
    if (query.groupName) {
      params.groupName = query.groupName;
    }
    if (query.spaceName) {
      params.spaceName = query.spaceName;
    }
    if (query.skuCode) {
      params.skuCode = query.skuCode;
    }

    const { code, data } = await getPackageConfigData(params);
    if (code == 200) {
      // setItemList(res.data);
      const list = data.cateList || [];
      setTitle(data.pdfTitle);
      if (data.pdfName) {
        fileName = data.pdfName + ".pdf";
      }
      const arr = [];
      list.forEach((item) => {
        const list2 = item.list || []; // 分类
        // if(list2.length > 0) {
        const aux = item.cateTitle == "辅材配置清单"; // 辅材配置清单
        arr.push({ tag: 1, name: item.cateTitle, aux });
        arr.push({ tag: 2, aux });
        // }
        // 品类
        list2.forEach((item2) => {
          const list3 = item2.list || [];
          if (list3.length > 0) {
            arr.push({ tag: 3, name: item2.category, aux });
          }
          list3.forEach((item3) => {
            arr.push({ tag: 4, ...item3, aux });
          });
        });
      });
      setItemList(arr);
    }
  }

  function getIcon(name) {
    switch (name) {
      case "卧室":
        return ws;
      case "厨房":
        return cf;
      case "卫生间":
        return wsj;
      case "阳台":
      case "客厅":
      case "客餐厅":
        return kt;
      case "书房":
        return sf;
      default:
        return qw;
    }
  }

  // 生成PDF
  function onCreatePDF() {
    if (itemList.length > 0) {
      downAction = true;
      if (pdfRef.current) {
        const fileUrl = pdfUrl.current;
        if (fileUrl) {
          onDownFile(fileUrl, fileName);
        } else {
          BnqLottie.onShow("PDF生成中...");
          pdfRef.current.onCreate("", "内部资料，请勿外传");
        }
      }
    } else {
      BnqToast.show({ content: "PDF暂无数据" });
    }
  }

  // 分享PDF
  function onSharePDF() {
    if (itemList.length > 0) {
      downAction = false;
      if (pdfUrl.current) {
        onShareFile(pdfUrl.current, fileName);
      } else if (pdfRef.current) {
        BnqLottie.onShow("PDF生成中...");
        pdfRef.current.onCreate("", "内部资料，请勿外传");
      }
    } else {
      BnqToast.show({ content: "PDF暂无数据" });
    }
  }

  // 生成PDF
  async function onCapture(blob) {
    const { code, data } = await onUploadFile(blob, fileName);
    BnqLottie.onHide();
    if (code == 200) {
      pdfUrl.current = data.fileUrl;
      if (downAction) {
        BnqToast.show({ content: "PDF下载成功" });
        onDownFile(data.fileUrl, fileName);
      } else {
        onShareFile(data.fileUrl, fileName);
      }
    } else {
      BnqToast.show({ content: "PDF生成失败" });
    }
  }

  function rightView() {
    return (
      <>
        <div className="header-btn" onClick={onSharePDF}>
          <img className="header-icon" src={shareIc} />
        </div>
        <div className="header-btn" onClick={onCreatePDF}>
          <img className="header-icon" src={downIc} />
        </div>
      </>
    );
  }

  // 表头标签
  function itemTitle(item, index) {
    const cls = item.aux ? "item-title aux" : "item-title";
    return (
      <div key={`it-${index}`} className={cls}>
        {item.name}
      </div>
    );
  }

  // 表头标签
  function tabelLabel(item, index) {
    if (!item.name) {
      return <></>;
    }
    const icon = getIcon(item.name);
    return (
      <div key={`tl-${index}`} className="table-label">
        <img src={icon} />
        {item.name}
      </div>
    );
  }
  // 表头
  function tabelHead(item, index) {
    const id = `pdf-th-${index}`;
    const cls = item.aux ? "table-head aux" : "table-head";
    return (
      <div key={`th-${index}`} id={id} className={cls}>
        <span className="table-row table-row1">品类</span>
        <span className="table-row table-row2">品牌</span>
        {item.aux ? (
          <></>
        ) : (
          <span className="table-row table-row3">产品优势</span>
        )}
      </div>
    );
  }

  // 列表
  function tableView(item, index) {
    return (
      <div key={`tb-${index}`} className="table-body">
        <span className="table-row table-row1">{item.name}</span>
        <span className="table-row table-row2">{item.brand}</span>
        <span className="table-row table-row3">{item.desc}</span>
      </div>
    );
  }

  // 搜索结果列表
  function itemView(item, index) {
    const tag = item.tag || 1;
    switch (tag) {
      case 1:
        return itemTitle(item, index);
      case 2:
        return tabelHead(item, index);
      case 3:
        return tabelLabel(item, index);
      default:
        return tableView(item, index);
    }
  }

  return (
    <div className="erp-report">
      <Header title="谈单手册" rightView={rightView} />
      <div className="flex-box">
        {/* <div className="create-box"> */}
        <CapturePDF
          ref={pdfRef}
          width={PDFWidth}
          height={PDFHeight}
          onCapture={onCapture}
        >
          <span className="doc-title">{title}</span>
          {itemList.map(itemView)}
          {itemList.length > 0 ? (
            <span className="doc-alert">
              * 所有产品使用规则详见产品规则说明
            </span>
          ) : (
            <></>
          )}
        </CapturePDF>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ERPReport;
