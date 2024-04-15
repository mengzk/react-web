/**
 * Author: Meng
 * Date: 2023-09-01
 * Modify: 2023-09-01
 * Desc: 事件监听与发送
 * {key: string; tag: number; listener: (data: any) => void}
 */

import { useEffect, useCallback, useState } from "react";

let emitMap = [];

function useEmit(key, defData) {
  const [emitData, setEmitData] = useState(defData);

  useEffect(() => {
    const tag = Date.now();
    if (key) {
      addEmit(key, tag);
    }
    return () => {
      emitMap = emitMap.filter(e => e.key != key || e.tag != tag);
    };
  }, []);

  // 注册事件
  const addEmit = useCallback((key, tag) => {
    emitMap.push({key, tag, listener: setEmitData});
  }, []);

  // 发送事件
  const sendEmit = useCallback((key, data) => {
    emitMap.forEach((e) => {
      if(key === e.key) {
        e.listener(data);
      }
    })
  }, []);

  return { emitData, sendEmit };
}

export default useEmit;
