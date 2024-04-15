/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: img
 */
import React, { useRef, useEffect } from 'react';


function ImageLazy(props) {
  const observerRef = useRef(null);

  useEffect(() => {
    if(observerRef.current) {
      observerRef.current.disconnect();
    }
    if(props.url) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries.length > 0) {
          const entrie = entries[0];
          const isInter = entrie.isIntersecting;
          if (isInter) {
            console.log('image lazy load', entrie.target.src);
            console.log(entrie.target);
            const url = props.url || '';
            // 防止重复加载
            if (entrie.target.src != url) {
              entrie.target.src = url;
              // observerRef.current?.unobserve(entrie.target);
              observerRef.current?.disconnect();
            }
          }
        }
      });
    }
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [props.url]);


  function onLoad(e) {

    if(props.url && e.target.src != props.url) {
      observerRef.current?.observe(e.target);
    }
    
    if (props.onLoad) {
      props.onLoad(e);
    }
  }

  const options = {...props};
  if(props.url) {
    delete options.url;
  }
  return <img {...options} onLoad={onLoad}/>;
}

export default ImageLazy;