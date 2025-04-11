/*
 * Author: Meng
 * Create: YEAR-MONTH-DAY
 * Modify: YEAR-MONTH-DAY
 * Desc: 
 */

const routeStack = [];

window.addEventListener("popstate", (e) => {
  console.log("---> popstate", e.isTrusted);
  if (!e.isTrusted) {
    routeStack.pop();
  }
});

// 路由加载器
export function getStacks() {

}

// 设置路由栈
export function addStack(route) {
    routeStack.push({ path: route.url });
}