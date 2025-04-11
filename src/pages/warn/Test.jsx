import React, { useEffect, useState, useRef } from "react";

import useTouch from "../../hooks/useTouch";
import Upload from '../../components/fileUpload'

import "./index.css";
//
function TestPage(props) {
  const pageRef = useRef(null);
  const zoomBox = useRef(null);
  const [style, setStyle] = useState({});

  useTouch(zoomBox.current, (s, point) => {
    console.log(" ----> scale", s, point);
    // setStyle({ transform: `scale(${s})` });
    pageRef.current.scrollBy({ top: point.top, left: point.left, behavior: "instant" });
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      setStyle({ transform: "scale(1)" });
    }, 2000);
  }, []);

  return (
    <div ref={pageRef} className="test">
      <div className="zoom-box" ref={zoomBox}>
        <div className="preview">
          <img
            className="preview-img"
            src="https://cn.bing.com/th?id=OHR.ChateauLoire_ZH-CN5040147638_1920x1080.webp&qlt=50"
            alt=""
          />
        </div>
      </div>

      <div className="test-content">
        <Upload text="上传" column={5} height='70px' hideAdd/>
      </div>
    </div>
  );
}

export default TestPage;
