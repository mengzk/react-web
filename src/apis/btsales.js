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
export function queryTrackingUser(text) {
  return request({
    path: `/btsalesWebApi/workOrderTracking/queryUser?keyword=${text}`,
    method: "GET",
    tag: "btsales",
  });
}

/**
 * 获取遗留单列表 权限
 */
export function queryCPALegacyAuth(code) {
  return request({
    path: "/btsalesWebApi/cpaLegacyInfo/getOperateButtons?cpaCode=" + code,
    method: "GET",
    tag: "btsales",
  });
}

/**
 * 遗留单新建 初始化
 * @param {*} params
 */
export function queryCPALegacyInit(cpa) {
  return request({
    path: `/btsalesWebApi/cpaLegacyInfo/init?cpaCode=${cpa}`,
    method: "GET",
    tag: "btsales",
  });
}

/**
 * 获取遗留单保存
 */
export function cpaLegacySave(params) {
  return request({
    path: "/btsalesWebApi/cpaLegacyInfo/add",
    method: "POST",
    tag: "btsales",
    params,
  });
}

/**
 * 获取遗留单新建
 */
export function cpaLegacyCreate(params) {
  const path = params.id ? "update" : "startBpmApproval";
  return request({
    path: `/btsalesWebApi/cpaLegacyInfo/${path}`,
    method: "POST",
    tag: "btsales",
    params,
  });
}

/**
 * 获取遗留单列表
 */
export function queryCPALegacyList(code) {
  return request({
    path: "/btsalesWebApi/cpaLegacyInfo/queryPageWithItem",
    method: "POST",
    tag: "btsales",
    params: {
      cpaCode: code,
    },
  });
}

/**
 * 获取遗留单列表
 */
export function queryCPALegacyPage(code, num) {
  return request({
    path: "/btsalesWebApi/cpaLegacyInfo/queryPageWithItem",
    method: "POST",
    tag: "btsales",
    params: {
      cpaCode: code,
      pageNum: num,
      pageSize: 50,
    },
  });
}

/**
 * 获取遗留单详情
 */
export function queryCPALegacyInfo(id, code) {
  return request({
    path: `/btsalesWebApi/cpaLegacyInfo/get?id=${id}&cpaLegacyCode=${code}`,
    method: "GET",
    tag: "btsales",
  });
}

/**
 * 审价单权限
 */
export function queryAuditPriceAuth(code) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/getOperateButtons?cpaCode=" + code,
    method: "GET",
    tag: "btsales",
  });
}

/**
 * 获取审价单状态
 */
export function queryAuditPriceStatus(code, tag) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/getCpaStatus",
    method: "GET",
    tag: "btsales",
    params: {
      sourceOrderCode: code,
      sourceOrderType: tag,
    },
  });
}

/**
 * 审价单参数
 */
export function initAuditPrice(code, tag) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/formDetail",
    method: "GET",
    tag: "btsales",
    params: {
      sourceOrderCode: code,
      sourceOrderType: tag,
    },
  });
}

/**
 * 保存审价单
 */
export function saveAuditPrice(params, hideToast) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/save",
    method: "POST",
    tag: "btsales",
    params,
    toast: !hideToast,
  });
}

/**
 * 提交审价单
 */
export function commitAuditPrice(params) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/submit",
    method: "POST",
    tag: "btsales",
    params,
  });
}

/**
 * 查询so单列表
 */
export function querySoPage(sourceOrderCode, sourceOrderType, word) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/querySoPage",
    method: "POST",
    tag: "btsales",
    params: {
      pageSize: 10,
      pageNum: 1,
      sourceOrderCode,
      sourceOrderType,
      // sapSoCode,
      keyword: word,
    },
  });
}

/**
 * 查询so单列表
 */
export function queryLinkSo(sourceOrderCode,sourceOrderType) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/listCollectionSoInfo",
    method: "GET",
    tag: "btsales",
    params: {
      sourceOrderCode,
      sourceOrderType
    },
  });
}

/**
 * 关联so单
 */
export function saveSoMapping(sap, sourceOrderCode, sourceOrderType, cpaId) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/saveSoMapping",
    method: "POST",
    tag: "btsales",
    params: {
      cpaId: parseInt(cpaId),
      sourceOrderCode,
      sourceOrderType,
      sapSoCodeList: [sap],
    },
  });
}

/**
 * 删除so单列表
 */
export function deleteSoMapping(params) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/deleteSoMapping",
    method: "POST",
    tag: "btsales",
    params,
  });
}

/**
 * 已完成传单
 */
export function finishAuditPrice(id) {
  return request({
    path: `/btsalesWebApi/cpaCustomizedPriceAudit/finishFlyer?id=${id}`,
    method: "GET",
    tag: "btsales",
    // params,
  });
}

/**
 * 审价填写保存
 */
export function saveAuditPriceResult(params) {
  return request({
    path: "/btsalesWebApi/cpaCustomizedPriceAudit/saveFillResult",
    method: "POST",
    tag: "btsales",
    params,
  });
}
