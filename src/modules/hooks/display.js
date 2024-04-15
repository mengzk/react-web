/**
 * Author: Meng
 * Date: 2023-09-15
 * Modify: 2023-09-15
 * Desc: 窗口是否隐藏
 */

import { useEffect, useCallback, useState } from "react";

function useDisplay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => startup(), []);

  const startup = useCallback(() => {
    // 切换到后台/前台 监听
    window.addEventListener("visibilitychange", () => {
      setVisible(document.visibilityState == 'visible');
    });
  }, []);

  return { visible };
}

export default useDisplay;
