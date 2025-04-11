/**
 * Author: Meng
 * Date: 2025-03-04
 * Modify: 2025-03-04
 * Desc: 
 */
import React, {useEffect, useState } from "react";

import guideIcon from "../../../../assets/img/guide_erp.png";
import "./index.less";

function GuideErp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("erp-guide-show");
    if(!json) {
      setShow(true);
    }
  }, []);

  function onClose() {
    setShow(false);
    localStorage.setItem("erp-guide-show", "1");
  }

  if(show) {
    return(
      <div className="v-guide-view">
        <img className="v-guide-img" src={guideIcon} alt="guide" onClick={onClose}/>
      </div>
    );
  }else {
    return null;
  }
}

export default GuideErp;