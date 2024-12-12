#!/usr/bin/env node

/**
 * Author: Meng
 * Date: 2024-07-12
 * Modify: 2024-07-12
 * Desc: 构建发布版本
 */
const { generateVersion, writeVersion, importToCommonJs } = require("./utils")
const path = require("node:path")
const { ossUpload } = require("./oss")
// const inquirerES = importToCommonJs("inquirer")

const sourcePath = path.resolve(__dirname, "../dist") // 文件路径
const sourceManifestDir = path.resolve(__dirname, "../dist/manifest.json")
const manifestDir = path.resolve(__dirname, "../public/manifest.json")
const manifest = require("../public/manifest.json") // 项目包配置
const appInfo = require("../package.json")

// const choices = ["dev", "test", "uat", "prod"] // 发布环境 -不推荐设置prod
// console.log('------> options', process.argv);

// 读取 manifest.json环境配置
const tagEnv = manifest.env || "dev";
deployApp(tagEnv);

// 获取环境
// let tagEnv = process.argv[2]

// if (tagEnv && choices.includes(tagEnv)) {
//   deployApp(tagEnv)
// } else {
//   // 选择环境
//   inquirerES.then((res) => {
//     const inquirer = res.default || {}
//     inquirer
//       .prompt([
//         {
//           type: "rawlist",
//           name: "env",
//           message: "选择发布环境?",
//           choices
//         }
//       ])
//       .then((answer) => {
//         deployApp(answer.env)
//       })
//   })
// }

// 部署应用
function deployApp(env) {
  console.log(`<------------------ ${manifest.name}(${env}) start deploy ------------------>`)
  // startDeploy(env)
}

// 开始打包部署
async function startDeploy(env) {
  const version = generateVersion(manifest[env] || appInfo.version)
  writeVersion(sourceManifestDir, env, version);

  const upload = await ossUpload(manifest.name, sourcePath, env)

  if (upload) {
    console.log(`\n****** ${manifest.name}(${env}, V${version}) succeed ******\n`)
    writeVersion(manifestDir, env, version)
  } else {
    console.warn(`\n****** ${manifest.name}(${env}, V${version}) fail ******\n`)
  }
  console.log("<------------------ end deploy ------------------>")
}
