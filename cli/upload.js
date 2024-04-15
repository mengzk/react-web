/**
 * Author: Meng
 * Date: 2022-09-01
 * Modify: 2022-09-01
 * Desc: 上传
 */

const axios = require("axios");
const fs = require("fs");

// 上传地址
const uploadUrl = "http://192.168.23.8:8087/file/upload";

const instance = axios.create({
  // baseURL: '',
  timeout: 20000, // 毫秒
  headers: { "Content-Type": "multipart/form-data" },
});

// 上传
function uploadFile(path) {
  return new Promise((resolve) => {
    const file = fs.createReadStream(path);
    const data = new FormData();
    data.append("file", file);
    instance
      .request({ url: uploadUrl, data })
      .then((res) => {
        console.log("---> upload response:", res);
        resolve(res.data);
      })
      .catch((err) => {
        resolve(null);
        console.log("---> upload error:", err.code);
      });
  });
}

module.exports = {
  uploadFile,
};
