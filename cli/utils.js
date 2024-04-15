/**
 * Author: Meng
 * Date: 2022-09-01
 * Modify: 2022-09-01
 * Desc: 工具类
 */

const archiver = require('archiver');
const path = require('path');
const fs = require('fs');

function formatNum(num) {
  return `${num > 9 ? '' : 0}${num}`;
}

// 获取当前时间
function curDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatNum(date.getMonth() + 1);
  const day = formatNum(date.getDate());
  const hour = formatNum(date.getHours());
  const min = formatNum(date.getMinutes());
  const second = formatNum(date.getSeconds());

  return `${year}${month}${day}${hour}${min}${second}`;
}

// 更新版本号
function updateVersion(version = '') {
  const versions = version.split('.');
  const size = versions.length - 1;
  let carryNum = 1;
  for (let i = size; i >= 0; i--) {
    let num = parseInt(versions[i]) + carryNum;
    if (num > 99) {
      num = 0;
      carryNum = 1;
    } else {
      carryNum = 0;
    }
    versions[i] = `${num}`;
  }
  return versions.join('.');
}

// 打包成zip
function generateZip(dir, fileName, version = '0.0.1', env = 'prod') {
  let finish = false;
  return new Promise((resolve) => {
    if (!fs.existsSync(dir)) {
      console.log(`---> compress ${dir} not exist`);
      resolve(null);
      return
    }
    let files = fs.readdirSync(dir);
    if (files.length < 1) {
      console.log(`---> compress ${dir} is empty`);
      resolve(null);
      return
    }

    // 写入打包配置
    const manifestDir = path.resolve(__dirname, '../public/manifest.json');
    writeVersion(manifestDir, env, fileName, version);

    console.log('\n---> compress dir:', dir);
    console.log(files);

    // 导出路径
    const outputDir = path.resolve(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputFile = `${outputDir}/${fileName}-${version}.zip`;
    const output = fs.createWriteStream(outputFile);

    output.on('finish', () => {
      finish = true;
      const fileSize = Math.round(archive.pointer() / 102.4) / 10;
      console.log(`---> compress finish size: ${fileSize}KB`);
      console.log(`---> compress output path: ${outputFile}`);
      resolve(outputFile);
    });
    output.on('close', () => {
      if (!finish) {
        console.log('---> compress close');
        resolve(null);
      }
    });

    const archive = archiver('zip', { zlib: { level: 9 } });
    // archive.on('finish', (res) => { console.log('---> compress finish') });
    archive.on('error', (err) => {
      console.log('---> compress error', err);
      resolve(null);
    });

    archive.directory(dir, fileName);
    archive.pipe(output);
    archive.finalize();
  });
}

// 写入版本信息
function writeVersion(manifestDir, env, fileName, version) {
  const manifest = require(manifestDir);

  manifest.env = env;
  manifest.name = fileName;
  manifest.date = curDate();
  manifest.version = version;
  manifest[env] = version;

  fs.writeFileSync(manifestDir, JSON.stringify(manifest, null, 2), 'utf-8');
  const manifest2 = manifestDir.replace('/public/', '/build/');
  fs.writeFileSync(manifest2, JSON.stringify(manifest, null, 2), 'utf-8');
}

function importToCommonJs(file = '') {
  return import(file);
}

module.exports = {
  updateVersion,
  generateZip,
  importToCommonJs,
};
