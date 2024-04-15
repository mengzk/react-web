/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: 
 */

import './goods.css';

const imgUrl = 'https://images.pexels.com/photos/19283359/pexels-photo-19283359.jpeg?w=320'
export default function GoodsItem(props) {
  return (
    <div className='v-goods-item' onClick={props.itemClick}>
      <img className='v-goods-item-img' src={imgUrl}/>
      <div className='v-goods-item-box'>
        <span className='v-goods-item-title'>测试商品-一个很长很长很长很长很长很长的标题</span>
        <div className='row ai-center v-goods-item-info'>
          <span className='v-goods-item-price'>
            <span className='v-goods-item-unit'>¥</span>
            <span>238</span>
          </span>
          <span className='v-goods-item-num'>售238</span>
        </div>
      </div>
    </div>
  )
}