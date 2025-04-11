/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 账号登录与否
 */
import { useEffect, useCallback, useState } from "react";
import { getUserInfo } from "../store";

function useAccount() {
  const [login, setLogin] = useState(false);
  let token = "";

  useEffect(() => {
    window.addEventListener("login-storage", queryLogin);
    return () => {
      window.removeEventListener("login-storage", queryLogin);
    };
  }, []);

  // 查询登录状态
  const queryLogin = useCallback((e) => {
    const info = getUserInfo();
    setLogin(info != null);
  }, []);
  return { login, token };
}

export default useAccount;
