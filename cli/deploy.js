#!/usr/bin/env node

/**
 * Author: Meng
 * Date: 2024-08-01
 * Modify: 2024-08-01
 * Desc:
 */
const dotenv = require("dotenv");

const fs = require("node:fs");
const path = require("node:path");

const { importToCommonJs } = require("./utils");
const inquirerES = importToCommonJs("inquirer");

const manifestDir = path.resolve(__dirname, "../public/manifest.json");
const manifest = require("../public/manifest.json"); // 项目包配置
// const packageInfo = require("../package.json");
// const envInfo = dotenv.parse(fs.readFileSync(".env"));

const choices = ["dev", "test", "uat", "prod"];

// 选择环境
inquirerES.then((res) => {
  const inquirer = res.default || {};
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "env",
        message: "选择发布环境?",
        choices,
      },
    ])
    .then((answer) => {
      deployApp(answer.env);
    });
});

// 修改环境变量
function deployApp(env) {
  console.log(`<------------------ deploy ${env} start ------------------>`);

  let tagEnv = {};
  switch (env) {
    case "dev":
      tagEnv = dotenv.parse(fs.readFileSync(".env.dev"));
    case "test":
    case "uat":
      tagEnv = dotenv.parse(fs.readFileSync(".env.test"));
      break;
    default:
      tagEnv = dotenv.parse(fs.readFileSync(".env.prod"));
      break;
  }
  const envKeys = Object.keys(tagEnv)
    .map((key) => `${key}='${tagEnv[key]}'`)
    .join("\n");

  console.log("------> env setting:", tagEnv);

  // 写入环境变量
  fs.writeFileSync(".env", envKeys);

  // 写入环境到 manifest.json
  manifest.env = env;
  fs.writeFileSync(manifestDir, JSON.stringify(manifest, null, 2));

  console.log(`<------------------ build  ${env}  start ------------------>`);
  // 开始编译项目
}
