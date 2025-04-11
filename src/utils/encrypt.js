/**
 * Author: Meng
 * Date: 2025-02-28
 * Modify: 2025-02-28
 * Desc: 
 */

/**
 * 字符串转换为base64
 * @param {*} data 
 */
export function base64Encode(str) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binary = '';
    const len = data.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(data[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.warn("---> base64 err:", str, e);
    return null;
  }
}