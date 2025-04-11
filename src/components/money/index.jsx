/**
 * Author: Meng
 * Date: 2025-03-27
 * Modify: 2025-03-27
 * Desc: 金钱格式化组件
 *    参数：
 *      text: 金额
 *      size: 单位字体大小
 *      unit: 单位
 *      format: 是否格式化
 *      symbol: 是否显示符号
 *      digit: 小数位数 0-2
 *      className: 自定义样式
 */
import React, { useState, useEffect } from "react";

//
function Money(props) {
  const [text, setText] = useState("0");
  const [style, setStyle] = useState({});
  const symbol = props.symbol == null ? true : props.symbol;

  useEffect(() => {
    const digit = parseInt(props.digit || "0");
    let text = props.text || "";
    if (text) {
      let unit = "元";
      if (props.format) {
        let num = parseFloat(text);
        if (num > 99999) {
          num = Math.round(num / 100) / 100;
          unit = "万";
        }
        text = num.toString();
      }
      // text = text.replace(/,/g, ""); // 去掉逗号
      // text = text.replace(/¥/g, ""); // 去掉人民币符号
      // text = text.replace(/元/g, ""); // 去掉元
      // 转化为 带有逗号的金额, 并保留两位小数, 小数位数不够补0
      text = parseFloat(text).toLocaleString("zh-CN", {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
      });
      text += props.unit || unit != "元" ? unit : ""; // 添加单位
      setText(text);
    }else {
      setText("0");
    }
  }, [props.text]);

  useEffect(() => {
    if (props.size) {
      setStyle({ fontSize: props.size });
    }
  }, [props.size]);

  return (
    <span className={props.className}>
      {symbol ? <span style={style}>¥</span> : null}
      <span>{text}</span>
    </span>
  );
}

export default Money;
