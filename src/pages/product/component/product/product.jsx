/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: 
 */

import './product.css';

export default function ProductItem(props) {
  const msg = props.text||'';
  const isLeft = props.site;

  return (
    <div className='v-product-item' onClick={props.itemClick}>
      {isLeft ? <span className='v-product-item-text'>{msg}</span>:<></>}
      <img className='v-product-item-img' />
      {isLeft ? <></>:<span className='v-product-item-text'>{msg}</span>}
    </div>
  )
}