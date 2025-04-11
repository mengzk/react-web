/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc: 
 */

export function errHandler() {
  window.addEventListener("error", (event) => {
    console.log("errorHandler", event);
    // event.preventDefault();
    // event.stopPropagation();
    // return true;
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.log("unhandledrejection", event);
    // event.preventDefault();
    // event.stopPropagation();
    // return true;
  });
  window.addEventListener("rejectionhandled", (event) => {
    console.log("rejectionhandled", event);
    // event.preventDefault();
    // event.stopPropagation();
    // return true;
  });
}