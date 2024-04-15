/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc:
 */
import React from "react";

import "./footer.css";

function Footer(props) {
  return (
    <div className="v-footer-layout">
      <div className="v-footer-box">
        <div className="v-footer-logo"></div>
        <div className="v-footer-menu-list">
          <span>首页</span>
          <span>产品</span>
          <span>关于</span>
          <span>联系</span>
        </div>
        <div className="v-footer-logo"></div>
      </div>
      <div className="v-footer-ban">
        <span>上海模版科技有限公司© 2023-2024 模版 - 让产更简单沪ICP备16055623号-3沪公网安备129839588865号</span>
      </div>
    </div>
  );
}

export default React.memo(Footer);
