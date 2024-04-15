/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc: 网格布局
 */
import {ReactNode} from 'react'

declare type GridProps = {
  id?: number | string;
  key?: number | string;
  /**
   * 列数
   */
  column?: number;
  /**
   * 行数
   */
  row?: number;
  /**
   * 列间距
   */
  columnGap?: number;
  /**
   * 行间距
   */
  rowGap?: number;
  /**
   * 行/列间距
   */
  gap?: number;
  /**
   * 是否滑动
   */
  scroll?: boolean;
  /**
   * 方向
   */
  direction?: 'column'|'row';
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 数据源
   */
  data?: Array<any>;
  /**
   * item视图
   * @param data
   * @param index
   */
  renderItem: (item: any, index?: number) => ReactNode;
  /**
   * 空视图，展示组件
   */
  emptyView: () => ReactNode;
};

/**
 * 网格布局
 * @param {GridProps} props -参数
 * @example 例子：
 * ```jsx
 * <Grid
 *    column={2}
 *    row={3}
 *    gap={8}
 *    data={[1,2,3,4,5]}
 *    renderItem={() => <div>。。。。</div>} />
 * ```
 */
declare function Grid(props: Readonly<GridProps>): Element;

export default Grid;
