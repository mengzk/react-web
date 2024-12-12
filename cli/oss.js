/**
 * Author: Meng
 * Date: 2024-07-12
 * Modify: 2024-07-12
 * Desc:
 */
// const OSS = require("ali-oss")
const OSS = class {
  constructor(options) {
    this.options = options
  }
  async head() {
    return Promise.resolve()
  }
  async list() {
    return Promise.resolve()
  }
  async deleteMulti() {
    return Promise.resolve()
  }
  async put() {
    return Promise.resolve()
  }
};
// const path = require("node:path")
const fs = require("node:fs")

const store = new OSS({
  region: "",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: ""
})
// const storePath = "https://test.com/";

function ossUpload(project, fileDir, env) {
  const storePath = `${env}/${project}`

  return new Promise(async (resolve) => {
    if (!fs.existsSync(fileDir)) {
      console.warn(`---> oss ${fileDir} not exist`)
      resolve(false)
      return
    }

    const files = fs.readdirSync(fileDir)
    if (files.length < 1) {
      console.warn(`---> oss ${fileDir} is empty`)
      resolve(false)
      return
    }
    let hasDir = true

    try {
      // 判断文件夹是否存在
      // await store.head(storePath, { })
      // hasDir = false
      // 删除文件夹
      await deleteDir(storePath)
      // 上传文件
      await startUpload(storePath, fileDir, files)
      resolve(true)
    } catch (e) {
      console.warn("---> oss catch", e)
      if (hasDir) {
        // 上传文件
        await startUpload(storePath, fileDir, files)
        resolve(true)
      }
    }
  })
}

function startUpload(storePath, dir, files) {
  const fileList = getFiles(files, dir)
  return Promise.all(
    fileList.map((file) => {
      console.log("---> put", `${dir}/${file}`)
      return store.put(`${storePath}/${file}`, `${dir}/${file}`)
    })
  )
}

async function deleteDir(prefix) {
  console.log("------> delete dir", prefix)
  const list = await store.list({ prefix, "max-keys": 1000 });
  if(list) {
    let files = list.objects || [];
    console.log("------> total file:", files.length);
    if(files.length > 0) {
      files = (list.objects || []).map((file) => file.name);
      return store.deleteMulti(files, {quiet: true});
    }
  }
  return;
}

function getFiles(files, dir, childDir = "") {
  let fileList = []
  try {
    files.forEach((file) => {
      const fileDir = childDir ? `${childDir}/${file}` : file

      const statStr = `${dir}/${fileDir}`
      let stat = fs.statSync(statStr)

      if (stat.isFile()) {
        if (statStr.includes(".") && !statStr.includes("DS_Store")) {
          fileList.push(fileDir)
        }
      } else {
        const files2 = fs.readdirSync(`${dir}/${fileDir}`) || []
        // console.log('------> files2', files2)
        const files3 = getFiles(files2, dir, fileDir)
        // console.log('------> files3', files3)
        fileList = fileList.concat(files3)
      }
    })
  } catch (error) {
    console.log("---> oss error", dir, error)
  }
  return fileList
}

module.exports = {
  ossUpload
}
