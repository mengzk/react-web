/**
 * Author: Meng
 * Date: 2024-11-10
 * Modify: 2025-02-26
 * Desc:
 */


/**
 * 校验手机号
 */
export function checkMobile(phone) {
  let bool = true;
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    bool = false;
  }
  return bool;
}

/**
 * 解析出url的请求参数
 */
export function getPageQuery(url) {
  let str = url || window.location.href;
  if(str.indexOf("#") > 0) {
    str = str.split("#")[1];
  }

  const query = str.split('?')[1];
  if (!query) {
    return {};
  }
  const search = query.split('&');
  const params = {};
  search.forEach(item => {
    const arr = item.split('=');
    params[arr[0]] = arr[1];
  });
  return params;
}

/**
 * 更新url参数
 * @param {*} params 
 */
export function updateHrefParams(params) {
  const url = window.location.href;
  const urlObj = new URL(url);
  for (const key in params) {
    urlObj.searchParams.set(key, params[key]);
  }
  window.history.replaceState(null, "", urlObj.href);
  // history.replaceState(null, "", window.location.href.split("?")[0]);
}

/**
 * 数字格式化
 * @param {*} e 数字
 * @param {*} flag 返回类型 integer正整数 number一位小数
 */
export function formatNumber(e, flag) {
  // 大于0 的正整数
  if (flag == "integer") return e.replace(/^0|[^0-9]/g, "");
  // 大于0 的一位小数
  if (flag == "number") {
    e = e.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    e = e.replace(/^\./g, ""); //验证第一个字符是数字而不是
    e = e.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    e = e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    return e.replace(/^(\\-)*(\d+)\.(\d).*$/, "$1$2.$3");
  }
}

/**
 * 数字格式化
 * @param {*} e 数字
 * @param {*} flag 返回类型 integer正整数 number两位小数
 */
export function formatNumber2(e, flag) {
  // 大于0 的正整数
  if (flag == "integer") return e.replace(/^0|[^0-9]/g, "");
  // 大于0 的两位小数
  if (flag == "number") {
    e = e.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    e = e.replace(/^\./g, ""); //验证第一个字符是数字而不是
    e = e.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    e = e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    return e.replace(/^(\\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  }
}
