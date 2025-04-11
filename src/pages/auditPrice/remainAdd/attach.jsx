/**
 * Author: Meng
 * Date: 2025-03-28
 * Modify: 2025-03-28
 * Desc:
 */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

import { BnqToast } from "mobilecomponet";

import CellLabel from "../../../components/cell-label";
import AttachUpload from "../../../components/attachUpload";

function AttachView(props, ref) {
  const { option, data } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const fileEnum = option?.fileInfoList || [];
    // 初始化数据
    if (data && data.id) {
      const fileList = data.cpaFileInfoGroupList || [];
      fileList.forEach((item) => {
        const arr = item.itemList || [];
        if (arr.length > 0) {
          const fe = fileEnum.find((f) => f.groupCode == item.groupCode);
          fe.itemList = arr;
        }
      });
    }
    setList([...fileEnum]);
  }, [props.data, props.option]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      // 必填项校验
      const arr = [];
      list.forEach((item) => {
        if (!item.itemList || item.itemList.length === 0) {
          arr.push(item.groupName);
        }
      });
      if (arr.length > 0) {
        const text = arr[0];
        BnqToast.show({ content: text + " 不能为空" });
        return [];
      }
      list.forEach(e => {
        e.itemList = e.itemList.map(f => ({ name: f.name, url: f.url }));
      });
      return list;
    },
  }));

  // 编辑备注
  function itemView(item, index) {
    const files = item.itemList || [];
    return (
      <div className="label-box" key={index}>
        <div className="cell-label">
          <span>{item.groupName}</span>
          <span>*</span>
        </div>
        <AttachUpload
          tag={index}
          files={files}
          max={10}
          onUpdate={(res) => {
            // console.log("onChange", res);
            const newList = [...list];
            newList[index].itemList = res;
            setList(newList);
          }}
        />
      </div>
    );
  }

  return (
    <div className="box-ar">
      <CellLabel title="上传资料" />
      {list.map(itemView)}
    </div>
  );
}

export default forwardRef(AttachView);
