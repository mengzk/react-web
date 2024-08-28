/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 搜索
 */
import { ReactElement } from 'react';

declare type SearchProps = {
  id?: number | string;
  key?: number | string;
  /**
   * 内容
   */
  value?: string;
  leftView?: () => ReactElement;
  leftIcon?: string;
  autoFocus?: boolean;
  enableEnter?: boolean;
  /**
   * 返回按钮
   */
  hasBack?: boolean;
  backIcon?: string;
  /**
   * 二维码
   */
  hasSearchIcon?: boolean;
  /**
   * 长度
   */
  maxLength?: number;
  /**
   * 显示确认按钮
   */
  searchBtn?: boolean;
  /**
   * 一直显示确认按钮
   */
  alway?: boolean;
  /**
   * 按钮样式
   */
  mode?: 'fill' | 'line';
  /**
   * 按钮位置
   */
  btnStyle?: 'out' | 'inside';
  margin?: string;
  backgroundColor?: string;
  placeholder?: string;
  /**
   * 输入类型
   */
  inputType?: 'text' | 'number' | 'password' | 'search';
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
    | undefined;
  onResult?: () => void;
  onBlur?: () => void;
  onBack?: () => void;
  /**
   * 事件结果
   */
  onResult?: (tag: string, data?: string) => void;
};

/**
 * 头像布局
 * @param {SearchProps} props -参数
 * @example 例子：
 * ```jsx
 * <Search
 *    radius={17}
 *    size={24}
 *    Search='xxx'
 *    onClick={()?:> {}} />
 * ```
 */
declare function Search(props: Readonly<SearchProps>): ReactElement;
export type { SearchProps };
export default Search;
