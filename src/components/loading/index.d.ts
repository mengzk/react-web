/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 加载中
 */

import { ReactNode } from "react";

type TextStyle = {
  color?: string;
  fontSize?: number|string;
  fontWeight?: string;
}

type IconStyle = {
  color?: string;
  fontSize?: number|string;
  fontWeight?: string;
  width?: number;
  height?: number;
}

type SizeStyle = {
  width?: number;
  height?: number;
}

type LoadStyle = {
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  strokeColor?; string;
  radius?: number;
  borderWidth?: number;
}

declare type LoadingProps = {
  id?: number | string;
  key?: number | string;
  ref?: any;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 
   */
  borderColor?: string;
  /**
   * 文字
   */
  text?: number;
  textStyle?: TextStyle;
  /**
   * 图标大小
   */
  iconSize?: number;
  iconStyle?: IconStyle;
  /**
   * 尺寸
   */
  size?: number;
  sizeStyle?: SizeStyle;
  /**
   * 半径
   */
  radius?: number;
  /**
   * 进度 0-100
   */
  progress?: number;
  /**
   * 显示进度值
   */
  showNum?: boolean;
  hideStroke?: boolean;
  /**
   * 进度单位
   */
  unit?: string;
  /**
   * 数字样式
   */
  numStyle?: TextStyle;
  /**
   * 样式
   */
  type?: "circle" | "progress" | "line" | "fill";

  style3?: LoadStyle;
};

/**
 * 加载中
 * @param {LoadingProps} props -参数
 * @example 例子：
 * ```jsx
 * <Loading
 *    radius={64}
 *    size={100}
 *    progress={30} />
 * ```
 */
declare function Loading(props: Readonly<LoadingProps>): ReactNode;

export default Loading;
