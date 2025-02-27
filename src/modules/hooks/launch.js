/**
 * Author: Meng
 * Date: 2023-11-30
 * Modify: 2023-11-30
 * Desc: 
 */


import { useEffect, useCallback, useState } from "react";
import AppConfig from "../../config";

function useLaunch() {
  const [launch, setLaunch] = useState(false);
  const [refresh, setRrefresh] = useState(false);

  useEffect(() => startup(), []);

  // 启动校验函数
  const startup = useCallback(() => {
    // 页面加载监听
    window.addEventListener("load", () => {
      const lastTime = window.localStorage.getItem("closeTime") || "0";
      const num = Date.now() - parseInt(lastTime); // 大于n秒视为新打开
      console.log(`---> last load gap: ${num}ms`);
      if (num < 100) {
        AppConfig.refresh = true;
        setRrefresh(true);
      }
    });
    // 页面关闭监听
    window.addEventListener("unload", (res) => {
      window.localStorage.setItem("closeTime", `${Date.now()}`);
    });

    const timer = setTimeout(() => {
      clearTimeout(timer);
      setLaunch(true);
    }, 600);
  }, []);

  return { launch, refresh };
}

export default useLaunch;