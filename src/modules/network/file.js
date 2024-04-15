/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc:
 */

import axios from "axios";

const instance = axios.create({
  // baseURL: '',
  timeout: 30000, // 毫秒
  headers: { "Content-Type": "multipart/form-data" },
});

// 上传
export function upload() {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    instance
      .request({ url: "", data })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 下载
export function download(url) {
  return new Promise((resolve, reject) => {
    instance
      .request({ url })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
