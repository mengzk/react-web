/*
 * Author: Meng
 * Create: YEAR-MONTH-DAY
 * Modify: YEAR-MONTH-DAY
 * Desc:
 */

class Toast {
  static __timer = null;
  static __child = null;

  static show(msg) {
    const div = document.getElementById("message");
    Toast.hide(div);

    div.style.display = "flex";
    div.className = "message-active";
    const span = document.createElement("div");
    span.className = "toast-box";
    span.innerText = msg;
    div.appendChild(span);

    Toast.__child = span;
    Toast.__timer = setTimeout(() => {
      Toast.__child = null;
      clearTimeout(Toast.__timer);
      div.className = "message-close";
      const timer2 = setTimeout(() => {
        clearTimeout(timer2);
        div.removeChild(span);
        div.style.display = "none";
      }, 300);
    }, 2000);
    
  }

  static hide(div) {
    if (Toast.__child) {
      clearTimeout(Toast.__timer);
      div.removeChild(Toast.__child);
      Toast.__child = null;
    }
  }

  static showDialog() {
    const div = document.getElementById("alert");
    div.style.display = "flex";
    const span = document.createElement("div");
    span.className = "dialog-box ";
    div.appendChild(span);
  }

  static hideModal() {
    const div = document.getElementById("alert");
    div.style.display = "none";
    div.className = "dialog-box-close";
  }
}

export default Toast;
