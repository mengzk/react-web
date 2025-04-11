/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc: 
 */
import { uploadFile, uploadFiles } from "../modules/request/file";

/**
 * 获取预算报价 -业务资料 套餐配置数据
 * @param {*} params 
 */
export function onUploadFile(file, fileName) {
  return uploadFile({
    path: "/api/fileUpload/uploadFileWithFileSuffix",
    tag: "oss",
    file,
    fileName,
  });
}

/**
 * 上传文件
 * @param {*} files 
 * @param {*} path 
 */
export function onUploadFiles(files = []) {
  return uploadFiles(files, "/api/fileUpload/uploadFileWithFileSuffix");
}