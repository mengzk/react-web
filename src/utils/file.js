/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc:
 */

import { onUploadFiles } from "../apis/file";

/**
 * 获取url参数
 * @param {*} file
 */
function fileToBolb(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file[0]);
  console.log(reader);
}

/**
 * base64 转成blob
 */
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

/**
 * blob转base64
 */
function blobToBuffer() {
  let blob = new Blob([1, 2, 3, 4]);
  let reader = new FileReader();
  reader.onload = function (result) {
    console.log(result);
  };
  reader.readAsArrayBuffer(blob);

  // let blob = new Blob([buffer])
}

/**
 * base64转文件
 */
function base64ConvertFile(urlData, filename) {
  if (typeof urlData != "string") {
    return;
  }
  let arr = urlData.split(",");
  let type = arr[0].match(/:(.*?);/)[1];
  let fileExt = type.split("/")[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "filename." + fileExt, {
    type: type,
  });
}

/**
 * 文件转base64
 */
function getFormData() {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let fileObj = base64ConvertFile("base64文件", "文件名称");
  let formdata = new FormData();
  formdata.append("file", fileObj, "名称");
}

function canvas() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let uint8ClampedArray = imageData.data;
}

/**
 * 二进制转base64
 */
function wsbuffer() {
  const socket = new WebSocket("ws://xxxx");
  socket.binaryType = "arraybuffer";

  // Wait until socket is open
  socket.addEventListener("open", function (event) {
    // Send binary data
    const typedArray = new Uint8Array(4);
    socket.send(typedArray.buffer);
  });

  // Receive binary data
  socket.addEventListener("message", function (event) {
    const arrayBuffer = event.data;
  });
}

/**
 * 选择本地文件
 */
export function onSelectFile(callback) {
  const input = document.createElement("input");
  input.type = "file";
  // input.accept = "image/*";
  input.accept = "image/*,application/pdf";
  input.multiple = true;
  input.capture = "camera";
  input.style.display = "none";
  document.body.appendChild(input);
  input.onblur = () => {
    console.log("---> onSelectFile blur");
    document.body.removeChild(input);
  };
  input.onerror = () => {
    console.log("---> onSelectFile error");
    document.body.removeChild(input);
  };
  input.oncancel = () => {
    console.log("---> onSelectFile cancel");
    document.body.removeChild(input);
  };
  input.oninvalid = () => {
    console.log("---> onSelectFile invalid");
    document.body.removeChild(input);
  };
  input.onchange = async (event) => {
    const files = event.target.files;
    // console.log("---> onSelectFile", files);
    if (files.length > 0) {
      const list = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        list.push(file);
      }
      const res = await onUploadFiles(list);
      // console.log("---> onSelectFile res", res);
      if(callback) {
        if(res.code == 0 && res.data) {
          callback(res.data);
        }else {
          callback(res);
        }
      }
      // const file = files[0];
      // if (file) {
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     const base64String = reader.result;
      //     console.log(base64String);
      //   };
      //   reader.readAsDataURL(file);
      // }
    }
  };
  input.click();
}
