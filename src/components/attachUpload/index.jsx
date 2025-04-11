/**
 * Author: Meng
 * Date: 2024-12-24
 * Modify: 2024-12-24
 * Desc: 上传附件 -带微信小程序
 */
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FileUpload, BottomPanel, BnqToast } from "mobilecomponet";

import { openMiniProgram, openCamera, openPhotoPicker } from "../../libs/bnq";
import useWindowVisible from "../../hooks/visible";
import { queryAttachFiles } from "../../apis/order";

import PanelView from "./panelView";

import "./index.less";

const env = process.env.NODE_ENV;
//
function AttachUpload(props = {}, ref) {
  const maxCount = props.maxCount || 30;
  const timerId = useRef(null);
  const batchNo = useRef("");
  const loopCount = useRef(0);
  const [loopLoad, setLoopLoad] = useState(false);
  const [list, setList] = useState([]);
  useWindowVisible((vis) => {
    if (vis && loopLoad) {
      clearTimeout(timerId.current);
      queryMiniFile();
    }
  });

  useEffect(() => {
    return () => {
      clearTimeout(timerId.current);
    };
  }, [list]);

  useEffect(() => {
    if(props.files) {
      const arr = props.files.filter(e => e.url);
      setList(arr);
    }
  }, [props.files]);

  useEffect(() => {
    batchNo.current = `${props.code}_${props.tag}`;
  }, [props.code]);

  // 组件挂载后查询文件
  useImperativeHandle(ref, () => ({
    setFiles: (data) => {
      setSelectFiles(data);
    },
    getFiles: () => {
      return list;
    },
  }));

  // 查询文件
  async function queryMiniFile() {
    clearTimeout(timerId.current);
    const { code, data } = await queryAttachFiles(batchNo.current);
    if (code == 0 && data && data.length > 0) {
      // 过滤掉已存在的文件
      setLoopLoad(false);
      let arr = data.map(formatFile);
      setSelectFiles(arr);
      // setList((old) => {return old.concat(arr)});
    } else if (code != 0) {
      loopCount.current++;
      if (loopCount.current < 36) {
        timerId.current = setTimeout(() => {
          clearTimeout(timerId.current);
          onQueryFile();
        }, 2000);
      }
    }
  }

  // 格式化文件
  const formatFile = (e) => {
    if (typeof e == "string") {
      const name = e.split("/").pop();
      return { name, url: e };
    } else {
      // fileRecordId: e.fileRecordId,
      let name = e.attachmentName;
      if (!e.attachmentName) {
        name = e.attachmentUrl.split("/").pop();
      }
      return { name, id: e.id, url: e.attachmentUrl };
    }
  };

  // 选择文件
  const setSelectFiles = (arr) => {
    // console.log("-----> setSelectFiles", arr);
    if (arr) {
      setList((old) => {
        let arr2 = arr.filter((_, i) => i < 50 - old.length);
        arr2 = arr2.map(formatFile);
        arr2 = old.concat(arr2);
        onUpdate(arr2);
        return arr2;
      });
    }
  };

  // 选择文件
  const onChange = (arr) => {
    // console.log("-----> onChange", arr, props.tag);
    setList(arr);
    onUpdate(arr);
  };

  // 更新文件 -回调父组件
  function onUpdate(arr) {
    props.onUpdate && props.onUpdate(arr, props.tag);
  }
  // 预览文件
  function onPreviewFile(e) {
    if (e.type == "pdf" && pdfPreviewRef.current) {
      pdfPreviewRef.current.show(e.url);
    } else {
      BnqToast.show({ content: "暂不支持预览此文件" });
    }
  }

  // 打开小程序
  function onMiniProgram() {
    clearTimeout(timerId.current);
    batchNo.current = `${props.code}_${props.tag}_${Date.now()}`;
    loopCount.current = 0;

    openMiniProgram({
      userName: "gh_877e9d845099",
      path: `pages/chooseFile/index?tag=${batchNo.current}&format=PDF,JPG,JPEG,PNG,CAD,DWG`,
      miniProgramType: env == "production" ? 0 : 2, // 0-正式版 1-开发版 2-体验版
    });
    setLoopLoad(true);
  }

  // 显示文件选择面板
  const onChoose = () => {
    function onClick(tag) {
      if (tag > 0) {
        const num = maxCount - list.length;
        // 1-拍照 2-相册 3-文件
        if (tag == 1) {
          openCamera("", (res) => {
            // console.log("-----> openCamera", res);
            setSelectFiles(res);
            // setList((old) => old.concat(res));
          });
        } else if (tag == 2) {
          openPhotoPicker(true, num, (res) => {
            // console.log("-----> openPhotoPicker", res);
            setSelectFiles(res);
          });
        } else if (tag == 3) {
          onMiniProgram(num);
        }
      }
      BottomPanel.close();
    }

    BottomPanel.show({
      hideHeader: true,
      touchOutCancel: true,
      bgStyle: "gray",
      bodyStyle: {
        "--border-radius": "16px",
      },
      element: <PanelView onClick={onClick} />,
    });
  };

  return (
    <FileUpload
      files={list}
      max={maxCount}
      top
      iconStyle={{ fontSize: "32px" }}
      text="图片/文件"
      onChange={onChange}
      onPreviewFile={onPreviewFile}
      onChoose={onChoose}
    />
  );
}

export default forwardRef(AttachUpload);
