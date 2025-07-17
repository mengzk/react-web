/**
 * Author: Meng
 * Date: 2025-02-11
 * Modify: 2025-02-11
 * Desc:
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入 copy-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 引入 mini-css-extract-plugin
const dotenv = require("dotenv");

let envStr = process.env.NODE_ENV; // 默认环境变量
if (!["prod", "uat", "test", "dev"].includes(envStr)) {
  envStr = null;
}
const envFile = envStr ? `.env.${envStr}` : ".env"; // 环境变量文件
const envCo = dotenv.config({ path: envFile }).parsed; // 解析环境变量文件
const eTag = `-${envCo.REACT_ENV}`; // 连接符

console.log("---> env:", envStr);
console.log(envCo);

// 是否是开发环境
const isDev = envCo.NODE_ENV != "production";

// 自定义配置
module.exports = {
  mode: envCo.NODE_ENV,
  entry: ["@babel/polyfill", "./src/index.js"], // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    // filename: "bundle.js", // 输出文件名
    publicPath: isDev ? "/" : "./", // 静态资源路径
    chunkFilename: `[name].min.js?v=[hash:8]`, // 按需加载的文件名
    filename: isDev ? "js/[name].js" : "js/[name].[hash].js", // 输出文件名
  },
  resolve: {
    extensions: [".js", ".jsx"], // 自动解析文件扩展名
    alias: {
      "@": path.resolve(__dirname, "src"), // 设置 @ 指向 src 目录
      // assets: path.resolve(__dirname, "src/assets"), // 设置 assets 指向 src/assets 目录
      // components: path.resolve(__dirname, "src/components"), // 设置 components 指向 src/components 目录
      // pages: path.resolve(__dirname, "src/pages"), // 设置 pages 指向 src/pages 目录
      // utils: path.resolve(__dirname, "src/utils"), // 设置 utils 指向 src/utils 目录
      // hooks: path.resolve(__dirname, "src/hooks"), // 设置 hooks 指向 src/hooks 目录
      // store: path.resolve(__dirname, "src/stores"), // 设置 store 指向 src/stores 目录
      // api: path.resolve(__dirname, "src/modules/api"), // 设置 api 指向 src/modules/api 目录
      // request: path.resolve(__dirname, "src/modules/request"), // 设置 request 指向 src/modules/request 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配.js和.jsx文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        // use: ["style-loader", "css-loader", "less-loader"],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      // { test: /\.(pdf|mp4)$/, use: "raw-loader" },
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpe?g|gif|svg|mp4)$/,
        use: [
          {
            loader: "file-loader",
            // loader: 'url-loader',
            options: {
              name: "img/[name].[hash].[ext]",
              // outputPath: "img", // 输出路径
              limit: 8192, // 小于8k的图片自动转成base64格式
              publicPath: isDev ? "/" : "./",
              esModule: false, // 解决 html-withimg-loader 无法解析图片路径的问题
            },
          },
        ],
      },
      {
        test: /\.json$/, // 匹配.json文件
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "json", // 输出路径
              // publicPath: '', // 引用路径
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // 自动解析文件扩展名
  },
  plugins: [
    new CleanWebpackPlugin(), // 添加Clean插件
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML模板文件
      // filename: "index.html", // 输出文件名
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "app.[name].css?v=[hash]",
      chunkFilename: isDev ? "[id].css" : "app.[id].css?v=[hash]",
      ignoreOrder: true, // 忽略有关顺序冲突的警告
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "", globOptions: { ignore: ["**/index.html"] } }, // 复制 public 目录中的文件到输出目录，忽略 index.html
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envCo),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 禁用提取注释
      }),
    ],
  },
  stats: {
    all: false, // 关闭所有日志
    errors: true, // 仅显示错误
    warnings: true, // 仅显示警告
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 使用static替换contentBase
    },
    compress: true, // 是否启用gzip压缩
    port: envCo.PORT || 8063, // 端口号 -要与 .env文件中的端口号一致
    historyApiFallback: true, // 支持SPA
    client: {
      logging: "none", // 关闭开发服务器的日志
    },
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    proxy: [
      // {
      //   context: ["/api"],
      //   target: `https://bim-erp-bnq-test.bthome.com`,
      //   pathRewrite: { "^/api": "" },
      //   // secure: false, // 接受运行在 https 上的服务
      //   // changeOrigin: true, // 修改请求头中的 host 为 target
      // },
      {
        context: ["/erp"],
        target: `https://bim-erp-bnq${eTag}.bthome.com`,
        pathRewrite: { "^/erp": "" },
        secure: true,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          console.log("Proxying request to:", proxyReq.getHeader("host"));
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log("Received response from target:", proxyRes.statusCode);
        },
      },
      {
        context: ["/oss"],
        target: `https://oss${eTag}.bnq.com.cn`,
        pathRewrite: { "^/oss": "" },
        secure: true,
        changeOrigin: true,
      },
      {
        context: ["/btsales"],
        target: `https://btsales${eTag}.bnq.com.cn`,
        pathRewrite: { "^/btsales": "" },
        secure: true,
        changeOrigin: true,
      },
      {
        context: ["/order2"],
        target: `https://order${eTag}.bnq.com.cn`,
        pathRewrite: { "^/order2": "" },
        secure: true,
        changeOrigin: true,
      },
      {
        context: ["/saas"],
        target: `https://saas${eTag}.bnq.com.cn`,
        pathRewrite: { "^/saas": "" },
        secure: true,
        changeOrigin: true,
      },
      {
        context: ["/trade"],
        target: `https://trade${eTag}.bnq.com.cn`,
        pathRewrite: { "^/trade": "" },
        secure: true,
        changeOrigin: true,
      },
    ],
  },
};
