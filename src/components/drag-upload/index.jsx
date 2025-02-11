/**
 * Author: Meng
 * Date: 2025-01-13
 * Modify: 2025-01-13
 * Desc: 拖拽上传组件
 */

import React, { useState } from "react";

import "./index.css";

const DragUpload = () => {
  const [fileNames, setFileNames] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const names = files.map((file) => file.name);
    setFileNames(names);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="v-drag-upload">
      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <p>拖动文件到这里，或点击以选择文件</p>
      </div>
      <div>
        <h3>上传的文件名:</h3>
        <ul>
          {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DragUpload;
