/**
 * Author: Meng
 * Date: 2023-09-01
 * Modify: 2023-09-01
 * Desc: 网络离线/在线
 */

import { useEffect, useCallback, useState } from "react";

function useOnline() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      // 移除监听
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }, []);

  // 发送事件
  const callback = useCallback((e) => {
    // console.log('----useOnline:', e);
    setOnline(e.type == 'online');
  }, []);

  return { online };
}

export default useOnline;
