/**
 * Author: Meng
 * Date: 2024-01-10
 * Modify: 2024-01-10
 * Desc:
 */
import { useRef, useEffect } from "react";

//
function useTouch(element, onMove) {
  const startPoint = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length == 1) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        startPoint.current = { x, y };
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length == 1) {
        const { x, y } = startPoint.current;
        const dx = e.touches[0].clientX - x;
        const dy = e.touches[0].clientY - y;
        if (onMove) {
          onMove({ dx, dy });
        }
      }
    };

    const handleTouchEnd = (e) => {
      startPoint.current = { x: 0, y: 0 };
    };

    const handleTouchCancel = (e) => {
      startPoint.current = { x: 0, y: 0 };
    };

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

  return scale.current;
}

export default useTouch;
