/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc:
 */
import { request } from "../modules/request";

// 接口示例
export function test(params = { user: "123", memo: "12314" }) {
  return request({
    path: "/test/demo",
    method: "GET",
    params,
    headers: { token: "123" },
  });
}


/**
 * C端合同详情
 */
export function getContractDetail(params) {
  return request({
    path: '/trade-web/intentContract/detail', 
    method: 'GET',
    tag: 'trade',
    params
  });
}