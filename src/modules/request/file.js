/**
 * Author: Meng
 * Date: 2025-03-04
 * Modify: 2025-03-04
 * Desc:
 */
import { getDomainFromTag } from "./config";

/**
 * 多文件上传
 * @param {*} files
 * @returns
 */
export function uploadFiles(files = [], path = "") {
  return new Promise((resolve) => {
    if (!files || files.length == 0) {
      resolve({ code: -1000, msg: "文件不能为空", data: null });
      return;
    }
    // 分批上传
    const total = files.length; // 总数
    const chunk = 2; // 每次上传的并发数量
    let index = 0; // 当前上传的索引
    let results = []; // 存储上传结果
    let list = files.map((e) => {
      // 处理文件名
      let fileName = e.name || e.fileName || "";
      return {
        file: e,
        tag: "oss",
        fileName,
        path,
      };
    });

    const uploadNext = async () => {
      if (index >= total) {
        // 如果所有文件都已上传完成，返回结果
        const data = { all: false, urls: [] };
        results.forEach((e) => {
          if (e.code == 0 && e.data) {
            data.urls.push(e.data.fileUrl);
          }
        });
        data.all = data.urls.length === list.length;
        resolve({ code: 0, data });
      } else {
        const currentBatch = list.slice(index, index + chunk); // 获取当前批次的文件
        index += chunk; // 更新索引
        const batchResults = await Promise.all(currentBatch.map(uploadFile));
        results = results.concat(batchResults); // 合并结果
        // 递归上传下一批
        uploadNext();
      }
    };
    uploadNext();
  });
}

/**
 * 上传文件
 */
export function uploadFile({
  file,
  tag,
  fileName,
  path,
  method = "POST",
} = {}) {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ code: -1000, msg: "文件不能为空", data: null });
      return;
    }
    const uploadUrl = getDomainFromTag(tag || "oss", path);
    console.log("---> uploadFile ", uploadUrl, fileName);

    const body = new FormData();
    body.append("bucket", "bajanju-p-oss");
    body.append("file", file, fileName);
    // body.append(
    //   "params",
    //   new Blob([JSON.stringify(params)], { type: "application/json" })
    // );

    fetch(uploadUrl, {
      body,
      method,
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log("---> uploadFile ", res);
        // console.log(res);
        if (res) {
          if (res.success) {
            resolve({ code: 0, msg: "ok", data: res.content });
          } else {
            resolve({ code: res.code, data: null, message: res.msg });
          }
        } else {
          resolve({ code: -1001, message: "", data: null });
        }
      })
      .catch((err) => {
        console.log("---> uploadFile err ", err);
        resolve({ code: -1002, message: "", data: null });
      });
  });
}

/**
 * 下载文件
 */
export function downFile(url, fileName = "") {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  if (fileName) {
    link.download = fileName;
  }
  document.body.appendChild(link);
  link.click();
  // 释放的 URL 对象以及移除 a 标签
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
  // fetch(url)
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     const link = document.createElement("a");
  //     link.style.display = "none";
  //     const objectUrl = URL.createObjectURL(blob);
  //     link.href = objectUrl;
  //     if (fileName) {
  //       link.download = fileName;
  //     }
  //     document.body.appendChild(link);
  //     link.click();
  //     // 释放的 URL 对象以及移除 a 标签
  //     URL.revokeObjectURL(objectUrl);
  //     document.body.removeChild(link);
  //   })
  //   .catch((err) => {
  //     console.error("Download file error:", err);
  //   });
}

/**
 * 上传多文件
 */
export function upFiles(files = []) {
  return new Promise((resolve) => {
    if (!files || files.length == 0) {
      resolve({ code: -1000, msg: "文件不能为空", data: null });
      return;
    }
    const uploadUrl = "http://192.168.242.219:8093/file/uploads";
    const body = new FormData();
    body.append("bucket", "bajanju-p-oss");
    files.forEach((file) => {
      body.append("files", file);
    });

    fetch(uploadUrl, {
      body,
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("uploadFiles resolve ", res);
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
        console.log("uploadFiles Error ", err);
        resolve({ code: -1002, msg: "", data: null });
      });
  });
}
