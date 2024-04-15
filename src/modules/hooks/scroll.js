/**
 * Author: Meng
 * Date: 2023-09-26
 * Modify: 2023-09-26
 * Desc: 页面滑动监听
 */

import React, { useEffect, useState } from "react";

export function usePageScroll(onScroll) {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function scrollListener(res) {
      // const y = document.documentElement.scrollTop;
      // const x = document.documentElement.scrollLeft;
      const y = res.target.scrollingElement?.scrollTop;
      const x = res.target.scrollingElement?.scrollLeft;
      const res3 = { x, y };
      setScroll(res3);
      if (onScroll) {
        onScroll(res3);
      }
    }
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  return { scroll };
}
