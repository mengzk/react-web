/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 
 */
import { request } from "../request/index";

// 接口示例
export function test(params = { user: "123", memo: "12314" }) {
  return request({
    url: "/test/demo",
    method: "GET",
    params,
    headers: { token: "123123121" },
  });
}

// 
export function queryHomeData(params = { user: "123", memo: "12314" }) {
  return request({
    url: "/test/demo",
    method: "GET",
    params,
    headers: { token: "123123121" },
  });
}

/**
 * @description: 登录接口
 * @param {Object} params 请求参数
 */
export function loginAccount(params = { password: "123456", username: "admin" }) {
  return request({
    url: "/account/login",
    method: "POST",
    params,
  });
}