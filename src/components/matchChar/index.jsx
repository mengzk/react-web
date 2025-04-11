/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc: 高亮匹配字符
 * 1. 传入需要高亮的字符和文本
 */
import React, { useState, useEffect } from "react";

const CHAR = "^"; // 用于分隔的字符
//
function MatchChar(props) {
  const word = props.word || "";
  const [list, setList] = useState([]);

  useEffect(() => {
    if (word == "") {
      return;
    }
    let text = props.text || "";
    const str = text.replace(new RegExp(word, "g"), `${word}${CHAR}${word}`);
    let arr = str.split(word);
    // console.log("arr", arr, str);
    setList(arr);
  }, [props.text, props.word]);

  // 高亮字符
  function charView(item, idx) {
    if (item == CHAR) {
      const style = {};
      if(props.color) {
        style.color = props.color;
      }
      return <span key={idx} style={style}>{word}</span>;
    }
    return <span key={idx}>{item}</span>;
  }

  if(word == "") {
    return <span className={props.className}>{props.text}</span>;
  }
  return <span className={props.className}>{list.map(charView)}</span>;
}

export default MatchChar;
