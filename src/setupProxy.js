const { createProxyMiddleware } = require('http-proxy-middleware');
// import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api', // 希望代理的 API 路径前缀。所有以 /api 开头的请求都会被代理到目标服务器
    createProxyMiddleware({
      target: 'http://192.168.253.154:8063', // 这是目标服务器的地址，所有代理请求都会被转发到这个地址
      changeOrigin: true, // 设置为 true 时，代理会更改请求的源头（origin），使其看起来像是直接从目标服务器发出的请求。
    })
  );
};