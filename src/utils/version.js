/**
 * Author: Meng
 * Date: 2023-11-16
 * Modify: 2023-11-16
 * Desc: 
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import { render, unmount } from './render'

let tagRootDiv = null;
let isReact18 = false;
try {
  // isReact18 = parseInt((ReactDOM.version || "16.3").split(".")[0]);
  // console.log(ReactDOM.version);
} catch (err) {
  console.log(err);
}

/**
 * 创建根节点
 * @param {*} ReactView 
 * @param {*} props 
 */
export function renderRoot(ReactView, props = {}, key = 'app-root') {
  tagRootDiv = document.getElementById(key);
  if (!tagRootDiv) {
    tagRootDiv = document.createElement('div');
    tagRootDiv.id = key;
    document.body.appendChild(tagRootDiv);
  }
  // if (isReact18) {
  //   if (!tagRootDiv) {
  //     const tagRoot = document.createElement('div');
  //     // tagRoot.id = 'app-root';
  //     tagRootDiv = ReactDOM2.createRoot(tagRoot);
  //     document.body.appendChild(tagRoot);
  //   }
  // } else {
  //   tagRootDiv = document.getElementById('app-root');
  //   if (!tagRootDiv) {
  //     tagRootDiv = document.createElement('div');
  //     tagRootDiv.id = 'app-root';
  //     document.body.appendChild(tagRootDiv);
  //   }
  // }

  props.root = tagRootDiv;
  render(React.createElement(ReactView, Object.assign({}, props)), tagRootDiv)
  // if (isReact18) {
  //   tagRootDiv.render(<ReactView {...props} />);
  // } else {
  //   ReactDOM.render(<ReactView {...props} />, tagRootDiv);
  // }
}

/**
 * 移除根节点
 * @param {*} ReactView 
 */
export function removeRoot(root) {
  try {
    unmount(root || tagRootDiv)
    // if (isReact18) {
    //   (root || tagRootDiv).render(<></>);
    // } else {
    //   ReactDOM.render(<></>, root || tagRootDiv);
    // }
  } catch (error) {
    console.log(error)
  }
}

export function changeCssVar(name, value) {
  // document.documentElement.style.setProperty('--bg-color', 'red');
  document.documentElement.style.setProperty(name, value);
}