/**
 * Author: Meng
 * Date: 2025-03-26
 * Modify: 2025-03-26
 * Desc:
 */
import React, { useEffect, forwardRef, useImperativeHandle } from "react";

import {
  getFileIcon,
  getFileType,
  videoFirstFrame,
  openChooseFile,
  onFormatFile,
} from "./util";
import "./index.css";
//
function FileUpload(props, ref) {
  const [style, setStyle] = React.useState({ box: {}, item: {} });
  const [files, setFiles] = React.useState([]);
  const disabled = props.disabled || false;
  const maxCount = props.max || 9;

  // 设置文件
  useEffect(() => {
    const list = props.files || [
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "图片",
        url: "https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        name: "这个名字很长很长很长很长很长很长123",
        url: "https://img.yzcdn.cn/vant/cat.pdf",
      },
    ];
    updateFiles(list);
  }, [props.files]);

  // 设置样式
  useEffect(() => {
    const box = {
      gridTemplateColumns: `repeat(${props.column}, 1fr)`,
      gap: props.gap || "8px",
      margin: props.margin || "0px",
      padding: props.padding || "0px",
    };
    const item = {
      width: props.width || "100%",
      height: props.height || "90px",
    };
    setStyle({ box, item });
  }, [props.column, props.gap, props.width, props.height]);

  // 外部函数
  useImperativeHandle(ref, () => ({
    setFiles: (files) => {
      updateFiles(files || []);
    },
    getFiles: () => {
      return files;
    },
    choose: onSelect,
  }));

  // 更新文件
  function updateFiles(newFiles) {
    let list = newFiles;
    if (list.length > maxCount) {
      list = list.slice(0, maxCount);
      console.warn(`---> 文件超过最大值${maxCount}`);
    }

    const arr = [];
    list.forEach((e) => {
      if (typeof e == "string") {
        const name = e.split("/").pop();
        const type = getFileType("", e);
        const icon = getFileIcon(type);
        arr.push({ name, url: e, type, icon });
      } else {
        if (!e.type) {
          let type = getFileType(e.name, e.url);
          e.type = type;
        }
        e.icon = getFileIcon(e.type);
        arr.push(e);
      }
    });

    setFiles(list);
  }

  // 变更文件
  function onChange(list) {
    setFiles(list);
    if (props.onChange) {
      props.onChange(list);
    }
  }

  // 删除文件
  function onDelete(e, idx) {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(idx);
    } else {
      const list = files.filter((_, i) => i !== idx);
      onChange(list);
    }
  }

  // 点击文件
  function onPreview(e, index, fileType) {
    e.stopPropagation();
    if (fileType === "image") {
      if (props.onPreview) {
        props.onPreview(fileType, index);
      } else {
        //
      }
    } else {
      if (props.onPreviewFile) {
        props.onPreviewFile(fileType, index);
      }
    }
  }

  // 选择文件
  function onSelect() {
    // e?.stopPropagation();
    if (props.onChoose) {
      const count = maxCount - files.length;
      props.onChoose(props.accept, count);
    } else {
      const count3 = maxCount - files.length;
      openChooseFile(props.accept, props.multiple, async (res) => {
        let list = res || [];
        let results = [];
        if (props.beforeUpload) {
          list = props.beforeUpload(list);
        }
        if (list.length < 1) {
          return;
        }
        if (list.length > count3) {
          BnqToast.show({ content: `最多传${maxCount}张图片哦~` });
        }
        list = list.filter((_, indx) => count3 > indx);
        if (props.onUpload) {
          results = await props.onUpload(list);
        } else {
          results = list.map(onFormatFile);
        }
        const newFiles = files.concat(results);
        onChange(newFiles);
      });
    }
  }

  // 文件显示
  function fileView(item, index) {
    const imgId = `img-${Date.now() % 1000000}-${index}`;
    const fileType = item.type || getFileType(item.name, item.url);
    let fileUrl = item.url;

    if (fileType === "video") {
      videoFirstFrame(item.url, imgId); // cover
      fileUrl = item.url;
    }

    if (fileType === "image" || fileType === "video") {
      return (
        <div
          key={index}
          className="bn-ud-im"
          style={style.item}
          onClick={(e) => onPreview(e, index, fileType)}
        >
          <img id={imgId} className="bn-ud-im-img" src={fileUrl} />
          {disabled ? null : (
            <img className="bn-ud-im-del" onClick={(e) => onDelete(e, index)} />
          )}
        </div>
      );
    } else {
      const fileIcon = item.icon || getFileIcon(fileType);
      return (
        <div
          key={index}
          className="bn-ud-im"
          style={style.item}
          onClick={(e) => onPreview(e, index, fileType)}
        >
          <img className="bn-ud-im-icon" src={fileIcon} />
          <span className="bn-ud-im-ne">{item.name}</span>
          {disabled ? null : (
            <img className="bn-ud-im-del" onClick={(e) => onDelete(e, index)} />
          )}
        </div>
      );
    }
  }

  // 上传按钮
  function btnView(tag) {
    if (disabled || props.hideAdd) {
      return null;
    }
    if ((props.top && tag === 1) || (!props.top && tag === 3)) {
      const cls = `iconfont icon-${props.icon || "camera"} bn-ud-im-add`;
      const itemStyle = { ...style.item };
      if (props.border) {
        itemStyle.border = border;
      }
      return (
        <div className="bn-ud-im2" style={itemStyle} onClick={onSelect}>
          <i className={cls} style={props.iconStyle} />
          {props.text ? (
            <span className="bn-ud-im-axt" style={props.textStyle}>{props.text}</span>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="bn-fud-view" style={style.box}>
      {btnView(1)}
      {files.map(fileView)}
      {btnView(3)}
    </div>
  );
}

export default forwardRef(FileUpload);
