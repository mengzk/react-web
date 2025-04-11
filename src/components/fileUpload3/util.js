/**
 * Author: Meng
 * Date: 2025-03-26
 * Modify: 2025-03-26
 * Desc:
 * 限制格式：accept =
 *      audio/*，表示“任何音频文件”。
 *      video/*，表示“任何视频文件”。
 *      image/*，表示“任何图片文件”。
 *      '.pdf'
 *      '.jpg, .jpeg, .png'
 *      '.doc, .docx'
 *      '.xls, .xlsx'
 *      '.ppt, .pptx'
 *      '.cad, .dwg'
 *
 */

// import cadIc from '../../assets/icon/cad_ic.png';
// import fileIc from '../../assets/icon/file_ic.png';
// import pdfIc from '../../assets/icon/pdf_ic.png';
// import pngIc from '../../assets/icon/png_ic.png';
// import wordIc from '../../assets/icon/word_ic.png';
// import xlsIc from '../../assets/icon/xls_ic.png';

// 文件图标
export function getFileIcon(fileType) {
  switch (fileType) {
    case "pdf":
      return "pdfIc";
    case "word":
      return "wordIc";
    case "excel":
      return "xlsIc";
    case "ppt":
      return "pngIc";
    case "cad":
    case "dwg":
      return "cadIc";
    case "image":
      return "";
    default:
      return "fileIc";
  }
}

/**
 * 文件格式
 */
export function onFormatFile(file, index) {
  let name = file.name;
  const fileType = getFileType(file.name);
  const url = fileType === "image" ? URL.createObjectURL(file) : file;
  return { url, name, type: fileType };
}

let fileCallback = null;
// 选择文件
export function openChooseFile(accept = "image/*", multiple, callback) {
  // const inputEle = document.createElement('input');
  fileCallback = callback;
  let inputEle = document.getElementById("v-ar-upload-input");
  if (inputEle) {
    document.body.removeChild(inputEle);
  }

  inputEle = document.createElement("input");
  inputEle.id = "v-ar-upload-input";
  document.body.appendChild(inputEle);

  inputEle.multiple = multiple;
  inputEle.accept = accept;
  inputEle.type = "file";
  // inputEle.capture = "camera";
  inputEle.style.display = "node";
  inputEle.hidden = true;

  function onFileChange() {
    const files = inputEle.files || [];
    const list = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // console.log(file, URL.createObjectURL(file));
      // if ((file.type || '').includes('video') && accept !== 'video/*') {
      //   console.log(file);
      //   return;
      // }
      list.push(file);
    }
    if (fileCallback) {
      fileCallback(list);
      fileCallback = null;
    }
  }

  // 多次回调是因为多次注册change事件,没取消
  inputEle.addEventListener("change", onFileChange);
  inputEle.click();
}

// 文件类型
export function getFileType(name = "", url = "") {
  let fileType = url.split(".").pop() || "";
  if (!fileType && name) {
    fileType = name.split(".").pop();
  }
  fileType = fileType.toLowerCase();
  // console.log(fileType)
  switch (fileType) {
    // case 'image/*':
    //   return 'image';
    case "mp4":
    case "avi":
    case "mov":
      fileType = "video";
      break;
    case "pdf":
      fileType = "pdf";
      break;
    case "doc":
    case "docx":
      fileType = "word";
      break;
    case "xls":
    case "xlsx":
      fileType = "excel";
      break;
    case "ppt":
    case "pptx":
      fileType = "ppt";
      break;
    case "cad":
    case "dwg":
      fileType = "cad";
      break;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      fileType = "image";
      break;
    default:
      fileType = "file";
      break;
  }

  return fileType;
}
export function videoFirstFrame(url = "", imgId, callback) {
  // return new Promise((resolve) => {
  const video = document.createElement("video"); // 创建video对象

  if (
    typeof url === "string" &&
    (url.includes("http://") || url.includes("https://"))
  ) {
    video.src = url; // url地址
  } else {
    video.src = URL.createObjectURL(url); // url地址
  }

  const canvas = document.createElement("canvas"); // 创建 canvas 对象
  const ctx = canvas.getContext("2d"); // 绘制2d
  video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
  video.currentTime = 3; // 第一秒帧
  video.oncanplay = () => {
    canvas.width = 100;
    canvas.height = 100;
    // 利用canvas对象方法绘图
    ctx.drawImage(video, 0, 0, 100, 100);
    canvas.toBlob((blob) => {
      // 转换成blob对象
      const url = URL.createObjectURL(blob); // 转换成url地址
      const imgEle = document.getElementById(imgId); // 获取img对象
      if (imgEle) {
        imgEle.src = url; // 设置img对象的src属性
      }
      if (callback) {
        callback(url);
      }
    });
    // 转换成base64形式
    // callback(canvas.toDataURL('image/png'));
    // const img = document.getElementById(divId);
    // if (img) {
    //   img.src = canvas.toDataURL('image/png');
    // }
  };
  // });
}
