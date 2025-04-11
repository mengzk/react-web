/**
 * Author: Meng
 * Date: 2024-04-12
 * Modify: 2024-04-12
 * Desc:
 */

import React, { useState, useEffect, Fragment } from 'react';

import right_dui from '../../assets/icon/select_dui.png';
import './index.less';

function TabLayout(props) {
  const items = props.data || [];
  const minWidth = props.gap || '16px';
  const valueKey = props.label || 'value';
  const horizontal = props.horizontal === undefined ? true : props.horizontal;
  const [curTag, setCurTag] = useState(0);

  useEffect(() => {
    setCurTag(props.index || 0);
  }, [props.index]);

  function onChangeTag(index) {
    setCurTag(index);
    if (props.onChange) {
      props.onChange(items[index], index);
    }
  }

  function tagView(item, index) {
    const tag1Cls = curTag == index ? 'v-tlh-tab-view v-tab-view-active' : 'v-tlh-tab-view';
    const text = typeof item == 'string' ? item : item[valueKey];
    return (
      <Fragment key={index}>
        {index != 0 ? <div style={{ minWidth }}></div> : <></>}
        <div className={tag1Cls} onClick={() => onChangeTag(index)}>
          {text}
          {curTag == index ? <img className='v-tab-right-icon' src={right_dui}/>:<></>}
        </div>
      </Fragment>
    );
  }

  function tagView2(item, index) {
    const tag1Cls = curTag == index ? 'v-tlv-tab-view v-tab-view-active' : 'v-tlv-tab-view';
    const text = typeof item == 'string' ? item : item[valueKey];
    return (
      <Fragment key={index}>
        {index != 0 ? <div style={{ minHeight: minWidth }}></div> : <></>}
        <div className={tag1Cls} onClick={() => onChangeTag(index)}>
          {text}
          {curTag == index ? <img className='v-tab-right-icon' src={right_dui}/>:<></>}
        </div>
      </Fragment>
    );
  }

  if (horizontal) {
    return <div className="v-tab-layout-h">{items.map(tagView)}</div>;
  } else {
    return <div className="v-tab-layout-v">{items.map(tagView2)}</div>;
  }
}

export default TabLayout;
