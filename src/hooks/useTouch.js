/**
 * Author: Meng
 * Date: 2024-01-10
 * Modify: 2024-01-10
 * Desc:
 */
import { useRef, useEffect } from "react";

const MAX_SCALE = 3;
const MIN_SCALE = 1;
//
function useTouch(element, onScale) {
  const startDistance = useRef(0);
  const lastTap = useRef(0);
  const scale = useRef(1);

  useEffect(() => {
    const handleTouchStart = (e) => {
      // console.log(" ----> e", e.touches[0]);
      if (e.touches.length == 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance.current = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length == 1) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap.current;
        if (tapLength < 300 && tapLength > 0) {
          const oldScale = scale.current;
          scale.current = scale.current * 1.5;
          if (scale.current > MAX_SCALE) {
            scale.current = 1;
          }
          if (scale.current < MIN_SCALE) {
            scale.current = 1;
          }
          // console.log(" ----> scale", scale.current);
          if (onScale) {
            const point = e.touches[0];
            onChange(point, oldScale);
          }
        }
        lastTap.current = currentTime;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length == 2) {
        const point1 = e.touches[0];
        const point2 = e.touches[1];
        const dx = point1.clientX - point2.clientX;
        const dy = point1.clientY - point2.clientY;

        // console.log(" ----> point", point1, point2);
        const newDistance = Math.sqrt(dx * dx + dy * dy);
        const newScale = (newDistance - startDistance.current) * 0.01;
        const oldScale = scale.current;

        scale.current += newScale;
        if (scale.current > MAX_SCALE) {
          scale.current = MAX_SCALE;
        }
        if (scale.current < MIN_SCALE) {
          scale.current = MIN_SCALE;
        }
        if (onScale) {
          const point = {
            clientX: (point1.clientX + point2.clientX) / 2,
            clientY: (point1.clientY + point2.clientY) / 2,
          };
          onChange(point, oldScale);
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        startDistance.current = 0;
      }
    };

    const handleTouchCancel = (e) => {
      if (e.touches.length < 2) {
        startDistance.current = 0;
      }
    };

    // console.log("-----> element", element);
    if (element) {
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchmove", handleTouchMove);
      element.addEventListener("touchend", handleTouchEnd);
      element.addEventListener("touchcancel", handleTouchCancel);
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
        element.removeEventListener("touchcancel", handleTouchCancel);
      }
    };
  }, [element]);

  function onChange(point, oldScale) {
    // element.style.transform = `scale(${scale.current})`;

    const x = point.clientX;
    const y = point.clientY;
    const top = y * (scale.current - oldScale);
    const left = x * (scale.current - oldScale);
    // element.style.transformOrigin = `top left`;
    // element.style.transformOrigin = `center`;
    element.style.width = `${100 * scale.current}%`;
    element.style.height = `${100 * scale.current}%`;
    onScale(scale.current, { x, y, top, left });
    // element.scrollBy({ top, left, behavior: "smooth/instant" });
  }

  return scale.current;
}

export default useTouch;
