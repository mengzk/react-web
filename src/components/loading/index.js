/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 
 */
import React, { forwardRef, useImperativeHandle, useState, useEffect, useMemo, useRef } from 'react';

import './index.css';
import loadingIc from '../../assets/icon/logo.png';

let StartPoint = Math.PI / -2;
let EndPoint = Math.PI * 2;

function Loading(props, ref) {

  const [progress, setProgress] = useState(props.progress || 0);
  const canvasRef = useRef(null);
  // const config3 = useRef({x: 32, y: 32, lineWidth: 4, color: '#ff6600'});

  const style3 = useMemo(() => {
    const size = props.size || 96;
    const style = props.style3;

    let width = size;
    let height = size;
    if (style) {
      width = style.width || size;
      height = style.height || size;
    }
    return { width, height, x: width / 2, y: height / 2 };
  }, [props.size, props.style3]);

  const config3 = useMemo(() => {
    const style = props.style3 || {};
    const lineWidth = style.lineWidth || 4;
    const radius = ((style3.width || 88)-lineWidth)/2;
    const borderWidth = style.borderWidth || 0;
    const color = style.strokeColor || '#626262';

    const proType = props.type || 'progress';

    return { radius, lineWidth, borderWidth, proType, color };
  }, [props.type, props.style3]);

  useImperativeHandle(ref, () => {
    return {
      onUpdate(num) {
        if (num < 101 && num > -1) {
          updateProgress(num)
        }
      }
    }
  }, []);

  useEffect(() => {
    if(props.type != 'circle') {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        scale()
        updateProgress(props.progress || 0);
      }, 300);
    }
  }, []);

  function darwBorder() {
    if (canvasRef.current) {
      const { x, y } = style3;
      const { lineWidth, radius, borderWidth } = config3;
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = borderWidth || Math.max(lineWidth - 2, 1);
      ctx.strokeStyle = props.borderColor || '#969696';
      ctx.arc(x, y, radius, 0, EndPoint);
      ctx.stroke();
    }
  }

  function updateProgress(num = 0) {
    if(props.hideStroke) {
      props.showNum && setProgress(num);
      return
    }
    if (canvasRef.current) {
      const { x, y, width, height } = style3;
      const { lineWidth, radius, proType, color } = config3;
      const isFill = proType == 'fill'
      const ctx = canvasRef.current.getContext("2d");

      ctx.clearRect(0, 0, width, height);
      darwBorder();
      ctx.beginPath();

      if (isFill) {
        ctx.fillStyle = color;
        ctx.moveTo(x, x); // 实心需要
      } else {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        props.showNum && setProgress(num);
      }
      ctx.arc(x, y, radius, StartPoint, EndPoint * (num - 25) / 100);
      isFill ? ctx.fill() : ctx.stroke();
      ctx.closePath();
    }
  }

  function scale() {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let width = canvas.width, height = canvas.height;
      if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        // console.log(canvas.width, width)
        // canvas.style.transform = `translate(${width/4}px,${height/4}px)`
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    }
  }
  if (props.type == 'circle') {
    const iconStyle = {...(props.iconStyle||{width: style3.width, height: style3.height})};
    return (
      <div className='v-loading-view2' style={{width: style3.width, height: style3.height}}>
        <div className='v-loading-view-box'>
          <img style={iconStyle} src={loadingIc}/>
        </div>
        <span className='v-loading-view-text' style={props.textStyle}>{props.text}</span>
      </div>
    )
  } else {
    return (
      <div className='v-loading-view' style={{width: style3.width, height: style3.height}}>
        <canvas ref={canvasRef} width={style3.width} height={style3.height} />
        {props.showNum ? <div className='v-loading-progress' style={props.textStyle}>{progress}{props.unit || ''}</div> : <></>}
      </div>
    )
  }
}

export default forwardRef(Loading);