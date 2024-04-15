/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 
 */
import React from 'react';

import './index.css';

function Card(props) {
  const items = props.data || [];
  const column = props.column || 1;
  const row = props.row || 1;
  const gap = props.gap || 1;
  const columnGap = props.columnGap || 0;
  const rowGap = props.rowGap || 0;
  const backgroundColor = props.backgroundColor || 'transparent';

  if (items.length < 1) {
    return props.emptyView ? props.emptyView() : <></>;
  }

  if (column < 2 || props.scroll) {
    return <div className='v-grid-list' style={{flexDirection: props.direction || 'column', backgroundColor}}>{items.map(props.renderItem)}</div>;
  } else {
    const style2 = {gridTemplateColumns: `repeat(${column}, 1fr)`, gridTemplateRows: `${row}`, backgroundColor};
    if(gap > 0) {
      style2.gridGap = gap;
    }else {
      style2.gridRowGap = rowGap;
      style2.gridColumnGap = columnGap;
    }
    return (
      <div className='v-grid-view' style={style2}>
        {items.map(props.renderItem)}
      </div>
    )
  }
}

export default Card;