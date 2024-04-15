/**
 * Author: Meng
 * Date: 2023-09-01
 * Modify: 2023-09-01
 * Desc: 授权监听
 */

import { useEffect, useCallback, useState } from "react";

function useAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    startCheck();
    return () => {};
  }, []);

  // 发送事件
  const startCheck = useCallback(() => {
    // console.log('----useAuth:', e);
  }, []);

  return { auth };
}

export default useAuth;
