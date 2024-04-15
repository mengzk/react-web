/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 
 */
import React, { useRef, useState, useEffect } from "react";

import './index.css';

const list3 = [
  {
    url: "https://www.ld-seo.com/uploadfile/images/637f0862951e21669269602.jpg",
  },
  { url: "https://pic3.zhimg.com/v2-ec4ca0efcc1d7c061e0f4a1088fe6b1a_r.jpg" },
  {
    url: "https://images.pexels.com/photos/19283359/pexels-photo-19283359.jpeg?w=720",
  },
  {
    url: "https://www.ld-seo.com/uploadfile/images/637f0862951e21669269602.jpg",
  },
  { url: "https://pic3.zhimg.com/v2-ec4ca0efcc1d7c061e0f4a1088fe6b1a_r.jpg" },
  {
    url: "https://images.pexels.com/photos/19283359/pexels-photo-19283359.jpeg?w=720",
  },
  {
    url: "https://www.ld-seo.com/uploadfile/images/637f0862951e21669269602.jpg",
  },
];
const innerWidth = window.innerWidth;
function Swiper(props) {
  const [moveX, setMoveX] = useState(0);
  const [curIndex, setCurIndex] = useState(0);
  const lastMoveX = useRef(0);
  const startX = useRef(0);

  useEffect(() => { }, [])

  function onTouchStart(e) {
    // console.log('start', e);
    const na = e.nativeEvent.changedTouches;
    if (na.length > 0) {
      const item = na[0];
      startX.current = item.pageX;
    }
  }

  function onMouseMove(e) {
    const na = e.nativeEvent.changedTouches;
    if (na.length > 0) {
      const item = na[0];
      const diff = Math.round(lastMoveX.current + item.pageX - startX.current);
      // console.log('------> move', diff)
      if (diff != moveX && diff < 0 && diff > -300 * (list3.length - 1)) {
        const cIndex = Math.round(diff / -300);
        // console.log('------> cIndex', cIndex);
        setMoveX(diff);
        if (cIndex != curIndex) {
          setCurIndex(cIndex);
        }
      }
    }
  }

  function onTouchEnd() {
    // console.log('------> end', cIndex);
    const cIndex = Math.round(moveX / -300);
    let diff = Math.min(cIndex * -300, 0);
    const padding = (innerWidth - 300) / 2;
    // console.log('------> end: width: %d, padding: %d, diff: %d', innerWidth, padding, diff);
    if (cIndex == list3.length - 1) {
      diff += padding * 2;
    } else if (diff < 0) {
      diff += padding;
    }
    lastMoveX.current = diff;
    setMoveX(diff);
    if (cIndex != curIndex) {
      setCurIndex(cIndex);
    }
  }


  function renderItem(item, index) {
    const diff = Math.abs(index - curIndex);
    // const scale = `scale(${1 - diff * 0.1})`;

    // const move3 = lastMoveX.current - (index - curIndex)*300 + (index - curIndex) * (innerWidth - 300) / 2;
    // const imgStyle = {zIndex: 100-diff, width: '300px', transform: `translateX(${curIndex == index? moveX:move3}px) scale(${1 - diff * 0.1})` }
    const imgStyle = { width: '300px', transform: `translateX(${moveX}px) scale(${1 - diff * 0.1})` }
    return (
      <div key={`swper-${index}`} className="swiper-list-item">
        <img className="swiper-list-img" src={item.url} alt="" style={imgStyle} />
      </div>
    );
  }

  return (
    <div className="swiper">
      <div className="swiper-list"
        onTouchStart={onTouchStart}
        onTouchMove={onMouseMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}>
        {list3.map(renderItem)}
      </div>
    </div>
  )
}


export default Swiper;