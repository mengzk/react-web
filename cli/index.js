#!/usr/bin/env node

/**
 * Author: Meng
 * Date: 2022-09-01
 * Modify: 2022-09-01
 * Desc: 构建发布版本
 */

// const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

const { updateVersion, generateZip, importToCommonJs } = require('./utils');

const { uploadFile } = require('./upload');
const appInfo = require('../package.json');

const inquirerES = importToCommonJs('inquirer');

const manifestDir = path.resolve(__dirname, '../public/manifest.json');
if (!fs.existsSync(manifestDir)) {
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(manifestDir, JSON.stringify({ name: null, version: null, env: null, date: null }, null, 2), 'utf-8');
}
const manifest = require(manifestDir); // 项目包配置
const sourcePath = path.resolve(__dirname, '../build'); // 文件路径

const choices = ['dev', 'test', 'uat', 'prod']; // 发布环境

// 选择环境
inquirerES.then((res) => {
  const inquirer = res.default || {};
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'env',
      message: '选择发布环境?',
      choices,
    }
  ]).then((answer) => {
    // console.log(answer.env);
    deployApp(answer.env || 'prod');
  });
});

// 部署应用
function deployApp(env) {
  console.log(`<------------------ ${manifest.name}(${env}) start deploy ------------------>`);
  
  startDeploy(env);
}

// 开始部署
async function startDeploy(env) {
  
  const version = updateVersion(manifest[env] || appInfo.version);
  const fileName = manifest.name || appInfo.name;
  const filePath = await generateZip(sourcePath, fileName, version, env);
  if (filePath) {
    const res = await uploadFile(filePath);
    if (res) {
      manifest.version = version;
      console.log(`\n****** ${env}, ${manifest.name}(${version}) ******\n`);
    }else {
      console.log(`\n****** ${env}, 上传失败 ******\n`);
    }
  } else {
    console.log(`\n****** 打包失败 ******\n`);
  }
  console.log('<------------------ end deploy ------------------>');
}