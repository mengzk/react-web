/**
 * Author: Meng
 * Date: 2023-09-01
 * Modify: 2023-09-01
 * Desc: 账号登录与否
 */
import { useEffect, useCallback, useState } from "react";
import { getUserInfo } from "../store";

function useLogin() {
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

export default useLogin;
