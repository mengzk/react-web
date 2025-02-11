/**
 * Author: Meng
 * Date: 2025-02-11
 * Modify: 2025-02-11
 * Desc:
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 输出文件名
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
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // { test: /\.(pdf|mp4)$/, use: "raw-loader" },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img', // 输出路径
              publicPath: 'img', // 引用路径
            },
          },
        ],
      },
      {
        test: /\.json$/, // 匹配.json文件
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'json', // 输出路径
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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 使用static替换contentBase
    },
    compress: true,
    port: 8060, // 端口号 -要与 .env文件中的端口号一致
    historyApiFallback: true, // 支持SPA
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    proxy: [
      {
        context: ['/api'],
        target: 'http://aimlai.com',
        pathRewrite: { '^/api': '' },
        // secure: false, // 接受运行在 https 上的服务
        // changeOrigin: true, // 修改请求头中的 host 为 target
      },
    ],
  },
};
