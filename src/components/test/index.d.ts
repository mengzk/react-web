import React from 'react';

/**
 * Author: Meng
 * Date: 2023-12-05
 * Modify: 2023-12-05
 * Desc: 输入组布局
 */
declare type TextStyle = {
  color?: string;
  fontSize?: number;
  padding?: number | string;
  fontWeight?: number | string;
};

declare type InputBoxProps = {
  id?: number | string;
  key?: number | string;
  /**
   * 单位
   */
  unit?: string;
  placeholder?: string;
  /**
   * label文字
   */
  label?: string;
  value?: string;
  /**
   * label文字样式
   * 可传.css class样式明
   */
  labelStyle?: string | TextStyle;

  tag?: 'box' | 'layout';
  flex?: number;

  width?: number | string;
  autoFocus?: boolean;

  rightView?: () => React.ReactNode | React.ReactElement;
  /**
   * 校验输入内容
   * @param text 输入内容
   * @returns 提示文案
   */
  onVerify?: (text: string) => string;
  /**
   * 输入回调
   * @param text
   */
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

/**
 * 输入布局
 * @param {InputBoxProps} props -参数
 * @example 例子：
 * ```jsx
 * <InputBox onChange={() => {}} />
 * ```
 */
declare function InputBox(props: Readonly<InputBoxProps>): Element;

export default InputBox;
