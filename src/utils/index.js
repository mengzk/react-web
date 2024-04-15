/**
 * Author: Meng
 * Date: 2024-11-10
 * Modify: 2023-11-10
 * Desc: 
 */

import React from 'react';
// import ReactDOM from 'react-dom';
import {render, unmount} from './render'

let rootDivs = [];
let tagRootDiv = null;

/**
 * 创建根节点
 * @param {*} ReactView 
 * @param {*} props 
 */
export function renderRoot(ReactView, props = {}, key='app-root') {
  tagRootDiv = document.getElementById(key);
  if (!tagRootDiv) {
    tagRootDiv = document.createElement('div');
    tagRootDiv.id = key;
    document.body.appendChild(tagRootDiv);
  }
  props.root = tagRootDiv;
  render(React.createElement(ReactView, Object.assign({}, props)),tagRootDiv);
  rootDivs.push({key, div: tagRootDiv});
}

/**
 * 移除根节点
 * @param {*} ReactView 
 */
export function removeRoot(root) {
  try {
    let delView = root;
    if(root) {
      rootDivs = rootDivs.filter(e => e.key != root.id);
    }else if(tagRootDiv) {
      delView = tagRootDiv;
      rootDivs = rootDivs.filter(e => e.key != tagRootDiv.id);
    }else {
      delView = rootDivs.pop()?.div;
    }

    tagRootDiv = null
    if(delView) {
      unmount(delView);
    }
  } catch (error) {
    console.log(error)
  }
}