/**
 * Author: Meng
 * Date: 2024-01-10
 * Modify: 2024-01-10
 * Desc: 
 */
import React, { useRef, useEffect } from "react";

export function useMouse(props) {

  const startX = useRef(0);
  const startY = useRef(0);
  const point = useRef({ x: 0, y: 0, moveX: 0, moveY: 0 });

  useEffect(() => {

  }, []);

  function onTouchStart(e) {
    const ne = e.nativeEvent.changedTouches;
    if (ne.length > 0) {
      const item = ne[0];
      startX.current = item.pageX;
      startY.current = item.pageY;
    }
  }

  function onTouchMove(e) {
    const ne = e.nativeEvent.changedTouches;
    if (ne.length > 0) {
      const item = ne[0];
      let x = item.pageX;
      let y = item.pageY;
      let moveX = Math.floor(startX.current - mX);
      let moveY = Math.floor(startY.current - mY);

      point.current = { x, y, moveX, moveY };
      if(props.callback) {
        props.callback(point.current);
      }
    }
  }

  function onTouchEnd(e) {
    startX.current = 0;
    startY.current = 0;
  }

  function onTouchCancel(e) {

  }

  return { onTouchStart, onTouchMove, onTouchCancel, onTouchEnd: onTouchEnd };
}