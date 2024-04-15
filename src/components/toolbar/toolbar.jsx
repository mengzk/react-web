/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: scrollTop
 */
import React, { useRef, useState } from "react";

import "./toolbar.css";

import logoIcon from "../../assets/icon/logo.png";
import { usePageScroll } from "../../modules/hooks/scroll";

const maxHeight = Math.round(window.innerHeight * 0.83);
function Toolbar(props) {
  const [aplha, setAplha] = useState({});
  const lastHeight = useRef(0);

  usePageScroll(({y}) => {
    if (y < maxHeight || lastHeight.current <= maxHeight) {
      lastHeight.current = y;
      setAplha({ backgroundColor: `rgba(30, 30, 30, ${y / maxHeight})` });
    }
  });


  function onBack() {
    console.log("window.history:", window.history);
    // window.history.back();
  }

  function onClickTab(e) {
    // console.log("e:", e);
    const id = e.target.id;
    if (props.onChange) {
      props.onChange(id);
    }
  }

  return (
    <>
      <div className="v-toolbar-box" style={aplha}>
        <div className="v-toolbar-btn" onClick={onBack}>
          <img className="v-toolbar-logo" src={logoIcon} />
          <span className="v-toolbar-name">网站</span>
        </div>
        <ul className="v-toolbar-tab" onClick={onClickTab}>
          <li id="home" className="v-toolbar-tab-li">
            首页
          </li>
          <li id="goods" className="v-toolbar-tab-li">
            产品
          </li>
          <li id="about" className="v-toolbar-tab-li">
            关于
          </li>
          <li id="contact" className="v-toolbar-tab-li">
            联系
          </li>
        </ul>
      </div>
      {/* <div className="v-toolbar-height" /> */}
    </>
  );
}

export default React.memo(Toolbar);
