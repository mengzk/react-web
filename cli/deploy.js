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

// const appInfo = require("../package.json");
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
    case "test":
    case "uat":
      tagEnv = dotenv.parse(fs.readFileSync(`.env.${env}`));
      break;
    default:
      tagEnv = dotenv.parse(fs.readFileSync(".env.prod"));
      break;
  }
  const envKeys = Object.keys(tagEnv)
    .map((key) => `${key}=${tagEnv[key]}`)
    .join("\n");

  console.log("<------ env setting:", tagEnv);

  // 写入环境变量
  fs.writeFileSync(".env", envKeys);

  console.log(`<------------------ deploy  ${env}  end ------------------>`);
  // 开始编译项目 后续操作可以读取写入的环境变量
}
