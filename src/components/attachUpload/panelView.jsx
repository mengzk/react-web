/**
 * Author: Meng
 * Date: 2025-03-31
 * Modify: 2025-03-31
 * Desc:
 */
import React from "react";

import colseIc from "../../assets/icon/close_pop.png";
import cameraIc from "../../assets/icon/camera.png";
import photoIc from "../../assets/icon/photo.png";
import fileIc from "../../assets/icon/file.png";

import './index.less';
let lastTime = 0;
//
function PanelView(props) {

  function onClick(tag) {
    const now = new Date().getTime();
    if (now - lastTime < 1000) {
      return;
    }
    lastTime = now;
    if(props.onClick) {
      props.onClick(tag);
    }
  }

  return (
    <div className="wxf-attach-upload">
      <div className="panel-header">
        <div className="wxf-title">上传</div>
        <img className="wxf-close" src={colseIc} onClick={() => onClick(-1)}/>
      </div>
      <div className="panel-row">
        <div className="panel-item" onClick={() => onClick(1)}>
          <img className="pim-icon" src={cameraIc}/>
          <span className="pim-text">拍照</span>
        </div>
        <div className="panel-item" onClick={() => onClick(2)}>
          <img className="pim-icon" src={photoIc}/>
          <span className="pim-text">上传图片</span>
        </div>
        <div className="panel-item" onClick={() => onClick(3)}>
          <img className="pim-icon" src={fileIc}/>
          <span className="pim-text">上传文件</span>
        </div>
      </div>
    </div>
  );
}

export default PanelView;
