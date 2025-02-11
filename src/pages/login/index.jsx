/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: 启动页-可做成骨架屏
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Toast from "../../components/modal/toast";
import Consts from "../../config/consts";
import { loginAccount, queryUserInfo } from "../../modules/api/index";
import Account from "../../modules/store/account";

import "./index.css";

function LoginPage(props) {
  // const navigate = useNavigate();

  useEffect(() => {
    Account.clearInfo();
  }, []);

  async function onLogin() {
    // console.log(fromRef.current.account.value, fromRef.current.pwd.value);

    const { code, data } = await loginAccount({
      password: "admin123",
      username: "admin",
    });
    if (code == 0) {
      Consts.token = `Bearer ${data.token}`;

      onGetUserInfo();
      Account.setInfo(data);
    }
  }

  async function onGetUserInfo() {
    const { code, data } = await queryUserInfo();
    if (code == 0) {
      console.log(data);
      window.history.back();
    } else {
      Toast.show("请求报错");
    }
  }

  return (
    <div className="login">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="login-box">
          <span className="title">登录</span>
          <div className="input-box">
            <label className="input-label">用户名</label>
            <input className="l-input" placeholder="请输入账号" />
          </div>
          <div className="input-box">
            <span className="input-label">密 码</span>
            <input className="l-input" placeholder="请输入密码" />
          </div>
          <div className="login-hint">
            <div>
              <input type="checkbox" />
              <span>记住密码</span>
            </div>
            <button>忘记密码</button>
          </div>
          <div className="login-action">
            <button className="login-btn" onClick={onLogin}>
              登 录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
