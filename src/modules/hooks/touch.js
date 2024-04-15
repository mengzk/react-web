/**
 * Author: Meng
 * Date: 2024-01-10
 * Modify: 2024-01-10
 * Desc: 
 */
import React, { useRef, useEffect } from "react";

export function useTouch(props) {

  const startX = useRef(0);
  const startY = useRef(0);
  const point = useRef({ x: 0, y: 0, diffX: 0, diffY: 0 });

  useEffect(() => { }, []);

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
      let diffX = Math.floor(startX.current - mX);
      let diffY = Math.floor(startY.current - mY);

      point.current = { x, y, diffX, diffY };
      if (props.onMove) {
        props.onMove(point.current);
      }
    }
  }

  function onTouchEnd() {
    startX.current = 0;
    startY.current = 0;
    if (props.onMoveEnd) {
      props.onMoveEnd(point.current);
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: onTouchEnd };
}