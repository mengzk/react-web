/**
 * Author: Meng
 * Date: 2024-12-16
 * Modify: 2024-12-16
 * Desc:
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("setupProxy.js");
  app.use(
    "/api", // 代理路径
    createProxyMiddleware({
      target: "http://aimlai.com", // 配置转发目标地址(服务器地址)
      changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
      pathRewrite: { "^/api": "" }, // 去除请求前缀
    })
  );

  //   app.use("/api", // 代理路径
  //     createProxyMiddleware({
  //       target: "http://aimlai.com", // 配置转发目标地址(服务器地址)
  //       changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
  //       pathRewrite: { "^/api": "" }, // 去除请求前缀
  //     })
  //   );
};
