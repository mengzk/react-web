/**
 * Author: Meng
 * Date: 2023-09-26
 * Modify: 2023-09-26
 * Desc:
 */

export function parseParams(location) {
  const search = location.search || "";
  const param = {};
  if (search.includes("?")) {
    const arr = search.replace("?", "").split("&");
    arr.forEach((e) => {
      const cell = e.split("=");
      param[cell[0]] = cell[1];
    });
  }
  return param;
}
