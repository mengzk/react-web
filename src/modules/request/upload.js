/**
 * Web 上传/下载文件
 * /pklApi/file/uploadFile
 */
import { getDomainFromTag } from "./config";
import { httpClient } from "./axios";

// 上传多文件
export function uploadImgs(files = []) {
  return new Promise((resolve) => {
    if (!files || files.length == 0) {
      resolve({ code: -1000, msg: "文件不能为空", data: null });
      return;
    }
    const uploadUrl = 'http://192.168.242.219:8093/file/uploads';
    const body = new FormData();
    // body.append("bucket", "bajanju-p");
    files.forEach((file) => {
      body.append("files", file);
    });

    fetch(uploadUrl, {
      body,
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("uploadImgs resolve ", res);
        if (res) {
          if (res.code == "1") {
            resolve({ code: 0, msg: "ok", data: res.data });
          } else {
            resolve({ code: res.code, data: null, msg: res.returnMsg });
          }
        } else {
          resolve({ code: -1001, msg: "", data: null });
        }
      })
      .catch((err) => {
        console.log("uploadImgs Error ", err);
        resolve({ code: -1002, msg: "", data: null });
      });
  });
}

// 上传文件
export function uploadImg({ file, url, params = {}, method = "POST" } = {}) {
  
  return new Promise((resolve) => {
    if (!file) {
      resolve({ code: -1000, msg: "文件不能为空", data: null });
      return;
    }
    const uploadUrl = getDomainFromTag()+url;
    const body = new FormData();
    body.append("file", file);
    body.append(
      "params",
      new Blob([JSON.stringify(params)], { type: "application/json" })
    );

    fetch(uploadUrl, {
      body,
      method,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("uploadImg resolve ", res);
        // console.log(res);
        if (res) {
          if (res.code == "1") {
            resolve({ code: 0, msg: "ok", data: res.data });
          } else {
            resolve({ code: res.code, data: null, msg: res.returnMsg });
          }
        } else {
          resolve({ code: -1001, msg: "", data: null });
        }
      })
      .catch((err) => {
        console.log("uploadImg Error ", err);
        resolve({ code: -1002, msg: "", data: null });
      });
  });
}

// 文件下载
export function downFile({ url, method = "GET", name } = {}) {
  return new Promise((resolve) => {
    // const url = getDomainFromTag("api") + url;
    // fetch(url, {
    //   method,
    // })
    //   .then(function (response) {
    //     return response.blob();
    //   })
    //   .then(function (blob) {
    // console.log(blob);
    // const file = new Blob([blob], {
    //   // type: 'application/pdf;chartset=UTF-8'
    // })
    // var fileURL = URL.createObjectURL(file)
    // window.open(fileURL)
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url; // URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    // 释放的 URL 对象以及移除 a 标签
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
    resolve({ code: 0, msg: "ok", data: null });
    // }).catch((err) => {
    //   console.log("uploadFile Error ", err);
    //   resolve({ code: -1002, msg: "下载文件失败", data: null });
    // });
  });
}

// 文件下载
export async function download(url) {
  return httpClient({
    url,
    withCredentials: true,
    responseType: "blob",
  }).catch((err) => {
    console.log(err);
    return null;
  });
  // try {
      // const a = document.createElement("a")
      // a.href = path
      // a.download = fileName
      // document.body.appendChild(a)
      // a.click()
      // document.body.removeChild(a)

      // const iframe = document.createElement("iframe")
      // iframe.style.display = "none"
      // iframe.src = `javascript: '<script>location.href="${path}"</script>'`
      // document.body.appendChild(iframe)
      // setTimeout(() => {
      //   document.body.removeChild(iframe)
      // }, 6000)
    // } catch (e) {
    //   console.log("downloadFile catch", e)
    // }
}
