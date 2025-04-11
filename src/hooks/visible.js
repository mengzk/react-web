/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 窗口是否隐藏
 */

import { useEffect, useState } from "react";

//
function useWindowVisible(call) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const callback = () => {
      const hidden = document.visibilityState;
      console.log("---> window", hidden);
      setVisible(hidden == "visibleState");
      call && call(hidden == "visibleState");
    };
    // 窗口切换到后台/前台监听
    window.addEventListener("visibilitychange", callback);
    // 销毁监听
    return () => {
      console.log("---> remove visibilitychange");
      window.removeEventListener("visibilitychange", callback);
    };
  }, []);
  // const someFunc = useCallback(() => {}, []);
  return { visible };
}

export default useWindowVisible;
