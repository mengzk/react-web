/**
 * Author: Meng
 * Date: 2025-03-26
 * Modify: 2025-03-26
 * Desc:
 */

type TextStyle = {
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
};

type ResData = {
  type: string;
  name: string;
  url: string;
};

declare type UploadProps = {
  id?: number | string;
  key?: number | string;
  ref?: any;
  /**
   * 最大数量
   */
  max?: number;
  /**
   * 上传按钮是否固定首位
   */
  top?: boolean;

  files?: Array<string | File>;
  /**
   * 文件类型,jpg,png,pdf,mp4,ppt,word,xls
   */
  accept?: string;
  /**
   * 多选
   */
  multiple?: boolean;
  /**
   * 宽度
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   * 每行烈数
   */
  column?: number;
  /**
   * 边距
   * @deprecated
   */
  padding?: string;
  /**
   * 边框
   */
  border?: string;
  /**
   * 间隔, 水平
   */
  gap?: number;
  /**
   * 图片
   */
  icon?: string;
  /**
   * 图片样式
   */
  iconStyle?: TextStyle;
  /**
   * 提示文案
   */
  text?: string;
  /**
   * 文案颜色
   */
  textStyle?: TextStyle;

  /**
   * 是否上传
   */
  disabled?: boolean;

  /**
   * 隐藏上传按钮
   */
  hideAdd?: boolean;
  /**
   * 点击事件
   */
  onChange?: (files: Array<string | File>) => void;
  /**
   * 选择事件
   */
  onChoose?: (media?: string | Array<string>, num?: number) => void;
  /**
   * 上传事件
   */
  onUpload?: (files: File[]) => Promise<ResData[]>;
  /**
   * 预览事件
   */
  onPreview?: (file: Array<string>, index?: number) => void;
  /**
   * 预览文件
   */
  onPreviewFile?: (res: { url: any; type?: string }) => void;
};

/**
 * 头像布局
 * @param {UploadProps} props -参数
 * @example 例子：
 * ```jsx
 * <FileUpload text="上传" column={5} height='70px' onChange={(list) => {}} />
 * ```
 */
declare function FileUpload(props: Readonly<UploadProps>): Element;

export default FileUpload;
