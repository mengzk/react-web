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
 * 获取预算报价 -业务资料 配置项
 * @param {*} params 
 */
export function getPackageParamFilterData(token = '') {
  return request({
    path: `/apis/plan/getPackageParamFilterData/${token||'e123'}`,
    method: "GET",
    tag: "erp",
  });
}

/**
 * 获取预算报价 -业务资料 套餐配置数据
 * @param {*} params 
 */
export function getPackageConfigData(params = { }) {
  return request({
    path: "/apis/plan/getPackageConfigData",
    method: "POST",
    tag: "erp",
    params,
  });
}
