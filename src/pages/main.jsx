/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toolbar, MenuView } from "../components/index";

import Account from "../modules/store/account";

import "./main.css";

function MainPage(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isLogin = Account.hasLogin();
    setLogin(isLogin);
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  if (!login) {
    return <div></div>;
  }

  return (
    <div className="main">
      <Toolbar />
      <div className="main-content">
        <MenuView />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
