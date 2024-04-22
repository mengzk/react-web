/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc: 
 */
const host = ''; // 服务器地址
// const headers = {'Content-Type': 'multipart/form-data'}; // 请求头

// 上传
export function upload({ file, url='', params = {} } = {}) {
  return new Promise((resolve, reject) => {

    const url3 = `${host}${url}`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("param", new Blob([JSON.stringify(params)], { type: "application/json" }));

    fetch(url3, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 上传
export function uploads({ files = [], path='', params = {} } = {}) {
  return new Promise((resolve, reject) => {
    const url = `${host}${path}`;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    fetch(url, { method: "POST", data: formData })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 下载
export function download(url) {
  return new Promise((resolve, reject) => {});
}
