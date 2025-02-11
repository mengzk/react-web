import axios from "axios";

const instance = axios.create({
  timeout: 30000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

// 请求事例
export function httpClient(options) {

  if(options.method == "GET") {
    options.params = options.data;
    delete options.data;
  }

  return instance.request(options)
  .then((response) => {
    const code = response.status;
    if(response.status == 200) {
      return response.data;
    }else {
      const message = parseErr(code);
      return {code, message, data: null};
    }
  })
  .catch((err) => {
    let message = '';
    if (err.response) {
      console.warn('http response error:', err.response);
    } else if (err.request) {
      console.warn('http request error:', err.request);
    } else {
      console.warn('http client error:', err.message);
    }

    return {code: -1010, message, data: null};
  });
}

function parseErr(code) {
  let message = "";
  switch (code) {
    case 0:
      message = `${code == "econnaborted" ? "请求超时" : "网络异常"}，请重新连接`;
      break;
    case 403:
      message = "请求地址不能访问";
      break;
    case 404:
      message = "请求地址不存在";
      break;
    case 405:
      message = "请求方式错误，请联系开发人员";
      break;
    case 500:
      message = "权限不足, 请联系管理员";
      break;
    case 502:
      message = "服务重启中, 请稍后";
      break;
    case 504:
      message = "网关连接超时, 请稍后";
      break;
    default:
      message = `抱歉, 请求失败:${code}`;
      break;
  }
}